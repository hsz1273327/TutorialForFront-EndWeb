<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout padding="12">
                    <template v-for="(value, key) in permission_status" :key="key">
                        <StackLayout height="100">
                            <Label :text="`permission ${key} has status ${value}`" />
                            <Button v-show="value === 'undetermined' && key !== 'backgroundRefresh'"
                                :text="`query permission ${key}`" @tap="onActionTap(key)" />
                        </StackLayout>
                    </template>
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue'
import { isAndroid } from '@nativescript/core'
import { Permissions, check, checkMultiple, request, Status } from '@nativescript-community/perms';

let permissions: Array<Permissions> = [
    'location',
    'camera',
    'microphone',
    'photo',
    'contacts',
    'event',
    'bluetooth',
    'notification'
]

if (isAndroid) {
    const ext: Array<Permissions> = [
        'video',
        'audio',
        'mediaLocation',
        'bluetoothScan',
        'bluetoothConnect',
        'storage',
        'callPhone',
        'readSms',
        'receiveSms'
    ]
    permissions = permissions.concat(ext)
} else {
    const ext: Array<Permissions> = [
        "reminder",
        "backgroundRefresh",
        "speechRecognition",
        "mediaLibrary",
        "motion"
    ]
    permissions = permissions.concat(ext)
}


const permission_status = ref({})

async function getAllPermissionStatus() {
    console.log("%%%%%%%%%%%%%%%%getAllPermissionStatus")
    let query = {}
    let result = {}
    for (let perm of permissions) {
        switch (perm) {
            case "location":
                {
                    Object.assign(query, { location: { coarse: false, type: 'always' } })
                }
                break;
            case "storage":
                {
                    Object.assign(query, { storage: { manage: true } })
                }
                break;
            default:
                {
                    console.log(`*****************check ${perm}`)
                    let r = await check(perm)
                    console.log(`get check ${perm} result ${JSON.stringify(r)}`)
                    Object.assign(result, { [perm]: r[0] })
                }
                break;
        }
    }
    let mr = await checkMultiple(query)
    Object.assign(result, mr)
    permission_status.value = result
    console.log(`get result ${JSON.stringify(result)}`)
}

async function onActionTap(key: Permissions) {

    switch (key) {
        case "location":
            {
                const result = await request({ location: { coarse: false } })
                console.log(`get result ${JSON.stringify(result)}`)
                permission_status.value.location = result[0]
            }
            break;
        case "storage":
            {
                const result = await request({ storage: { manage: true } })
                console.log(`get result ${JSON.stringify(result)}`)
                permission_status.value.storage = result[0]

            }
            break;
        default:
            {
                const result = await request(key, { type: 'always' })
                console.log(`get result ${JSON.stringify(result)}`)
                permission_status.value[key] = result[0]
            }
            break;
    }

}

onMounted(getAllPermissionStatus)
</script>
