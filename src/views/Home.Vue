<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Button text="获取当前位置信息" @tap="onActionTap" />
                    <TextView :text="geoInfo" editable="false" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";

import { isEnabled, enableLocationRequest, getCurrentLocation, Location } from '@nativescript/geolocation'
import { getFromLocation, Location as geocodeLocation } from '@nativescript-community/geocoding';
import { CoreTypes } from '@nativescript/core' // used to describe at what accuracy the location should get


const geoInfo = ref("未获得地理位置信息")
async function getLocalInfo(): Promise<Location> {
    try {
        if (!isEnabled()) {
            console.log('enableLocationRequest')
            await enableLocationRequest()
        }
        console.log('getCurrentLocation')
        let currentLocation = await getCurrentLocation({
            desiredAccuracy: CoreTypes.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
        })
        console.log('My current latitude: ', currentLocation.latitude)
        console.log('My current longitude: ', currentLocation.longitude)
        return currentLocation
        
    } catch (error) {
        console.log(`getLocalInfo get error: ${error}`)
    }
}
async function getGeoCodeLocation(local: Location): Promise<geocodeLocation[]> {
    try {
        let locations = await getFromLocation(local.latitude, local.longitude, 5)
        console.log(`getGeoCodeLocation Found ${locations.length} place`)
        return locations
    } catch (error) {
        console.log(`getGeoCodeLocation get error: ${error}`)
        return []
    }

}
async function onActionTap() {
    let currentLocation = await getLocalInfo()
    // let foundplaces = await getGeoCodeLocation(currentLocation)
    let msg = `My current latitude: ${currentLocation.latitude}\n
    current longitude: ${currentLocation.longitude}\n`
    // if (foundplaces.length >0){
    //     msg += "found place: \n"
    //     for (let place of foundplaces){
    //         msg += `${place.name} in ${place.country} ${place.administrativeArea} ${place.locality}\n`
    //     }
    // }
    geoInfo.value = msg
}
</script>, Location
