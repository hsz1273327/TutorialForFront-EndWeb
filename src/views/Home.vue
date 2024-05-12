<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="checkPermission" @tap="checkPermission" />
                <Button :text="ble_opened_msg" @tap="checkOpen" />

                <Button :text="scan_msg" @tap="scanOrClose" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, $showModal } from 'nativescript-vue'
import { isAndroid } from '@nativescript/core'
import { Feedback } from "nativescript-feedback"
import { LoadingIndicator, Mode } from '@nstudio/nativescript-loading-indicator'
import { Bluetooth, Peripheral } from '@nativescript-community/ble'
import { ConnectionState, Service, AdvertismentData, Characteristic } from '@nativescript-community/ble/index.common'
import BlueToothListModal from '../components/BlueToothListModal.vue'
import ServiceListModal from '../components/ServiceListModal.vue'
const loader = new LoadingIndicator()
const feedback = new Feedback()
const bluetooth = new Bluetooth()

const ble_opened_msg = ref("bluetooth is not open")
const chosen_peripheral: Ref<Peripheral> = ref()
const scan_msg = ref("scan to connect")
async function checkPermission() {
    try {
        const hasPermission = await bluetooth.hasLocationPermission()
        if (!hasPermission) {
            const granted = await bluetooth.requestLocationPermission()
            console.log(`Location permission requested, user granted? ${granted}`)
            await feedback.success({ message: `Location permission requested, user granted? ${granted}` })
        } else {
            console.log(`Has Location Permission? ${hasPermission}`)
            await feedback.success({ message: `Has Location Permission? ${hasPermission}` })
        }
    } catch (error) {
        console.log(`checkPermission get error ${error}`)
        await feedback.error({ message: `checkPermission get error ${error}` })
    }
}

async function checkOpen() {
    if (ble_opened_msg.value == "blue tooth is opened") {
        feedback.info({
            message: "bluetooth already opened"
        })
    } else {
        if (isAndroid) {
            let enabled = await bluetooth.enable()
            feedback.success({
                message: "bluetooth opened"
            })
        } else {
            feedback.info({
                message: "please open bluetooth manually"
            })
        }
    }
}

const peripheralList: Ref<Peripheral[]> = ref([])
interface PeripheralConnInfo {
    UUID: string;
    name: string;
    state: ConnectionState;
    services?: Service[];
    advertismentData: AdvertismentData;

}

interface PeripheralDisConnInfo {
    UUID: string;
    name: string;
}
interface ServiceChosenInfo {
    servicUUID: string;
    serviceName: string;
    characteristicUUID: string;
    characteristicName: string;
    characteristicProperties: string;
}

async function openScan() {
    try {
        loader.show({
            message: 'Sanning...',
            details: 'sanning bluetooth peripherals!',
            margin: 10,
            dimBackground: true,
            color: '#4B9ED6',
            backgroundColor: 'yellow',
            userInteractionEnabled: false,
            hideBezel: true,
            mode: Mode.Indeterminate,
        })
        await bluetooth.startScanning({
            seconds: 4,
            avoidDuplicates: true,
            onDiscovered: function (peripheral: Peripheral) {
                if (peripheral.name) {
                    console.log(`Periperhal found ${JSON.stringify(peripheral)}`)
                    peripheralList.value.push(peripheral)
                }
            }
        })
        loader.hide()
        console.log(`scanning complete with list size ${peripheralList.value.length}`)
        let chosen = (await $showModal(BlueToothListModal, {
            fullscreen: false,
            props: {
                members: peripheralList.value
            }
        })) as Peripheral
        if (chosen) {
            chosen_peripheral.value = chosen
            scan_msg.value = "disconn"
            console.log(`chosen uuid: ${chosen.UUID}`)
            loader.show({
                message: 'Connecting...',
                details: 'Connecting to bluetooth peripheral!',
                margin: 10,
                dimBackground: true,
                color: '#4B9ED6',
                backgroundColor: 'yellow',
                userInteractionEnabled: false,
                hideBezel: true,
                mode: Mode.Indeterminate,
            })
            await bluetooth.connect({
                UUID: chosen.UUID,
                autoDiscoverAll: true,
                onConnected: (data: PeripheralConnInfo) => {
                    console.log(`connect to ${data.name} with uuid ${data.UUID}, keys ${Object.keys(data)}`)
                    if (data.services) {
                        data.services.forEach(function (service) { console.log("service found: " + JSON.stringify(service)) })
                        loader.hide()
                        $showModal(ServiceListModal, {
                            fullscreen: false,
                            props: {
                                services: data.services
                            }
                        }).then((serviceChosen: ServiceChosenInfo) => {
                            console.log(JSON.stringify(serviceChosen))
                            return bluetooth.read({
                                peripheralUUID: chosen.UUID,
                                serviceUUID: serviceChosen.servicUUID,
                                characteristicUUID: serviceChosen.characteristicUUID
                            })
                        }).then((result) => {
                            let data = new Uint8Array(result.value)
                            let datastr = uint8ArrayToHexString(data)
                            if (datastr.length == 10) {
                                let dataformated = hexStringFormat(datastr)
                                console.log(`get info: ${dataformated}`)
                                feedback.success({ message: `get info: ${dataformated}`})
                            } else {
                                console.log(`get message: ${datastr}`)
                            }
                        })
                    } else {
                        feedback.info({ message: `service data.UUID not have services` })
                        console.log("Peripheral data.UUID not have services")
                        loader.hide()
                    }
                },
                onDisconnected: (data: PeripheralDisConnInfo) => {
                    console.log(`disconnect ${data.UUID}`)
                }
            })
        }
    } catch (err) {
        console.log(`error while scanning: ${err}`);
    }
}

function uint8ArrayToHexString(uint8Arraydata: Uint8Array): string {
    return Array.from(uint8Arraydata).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function hexStringFormat(data: string): string {
    let step = 2
    let res = []
    let head = 0
    while (head < data.length) {
        let sub = data.substring(head, head + step)
        res.push(sub)
        head += 2
    }
    res.reverse()
    let voltagehex = res[0] + res[1]
    let voltage = parseInt(voltagehex, 16) / 100
    let humidityhex = res[2]
    let humidity = parseInt(humidityhex, 16)
    let temperaturehex = res[3] + res[4]
    let temperature = parseInt(temperaturehex,16) /100
    return `temperature:${temperature}C humidity: ${humidity}%,voltage: ${voltage}mv`
}

async function closeConn() {
    try {
        await bluetooth.disconnect({
            UUID: chosen_peripheral.value.UUID
        })
        chosen_peripheral.value = null
        scan_msg.value = "scan to connect"
        console.log("disconnected successfully")
    } catch (err) {
        console.log(`error while closeConn: ${err}`);
    }
}

async function scanOrClose() {
    if (scan_msg.value == "scan to connect") {
        await openScan()
    } else {
        await closeConn()
    }
}

onMounted(async () => {
    let enabled = await bluetooth.isBluetoothEnabled()
    ble_opened_msg.value = enabled ? "bluetooth is opened" : "bluetooth is not open"
})
</script>
