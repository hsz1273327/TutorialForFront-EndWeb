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
import { ConnectionState, Service, AdvertismentData } from '@nativescript-community/ble/index.common'
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
                // autoDiscoverAll: true,
                onConnected: (data: PeripheralConnInfo) => {
                    console.log(`connect to ${data.name} with uuid ${data.UUID}`)
                    if (data.services) {
                        for (let service of data.services) {
                            console.log(JSON.stringify(service))
                        }
                    }
                    loader.hide()
                    let serviceChosen = await $showModal(BlueToothListModal, {
                        fullscreen: false,
                        props: {
                            members: peripheralList.value
                        }
                    }) as ServiceChosenInfo
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
