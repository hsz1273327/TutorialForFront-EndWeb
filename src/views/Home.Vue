<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="获取权限10s后系统通知" @tap="onActionTap" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { LocalNotifications } from '@nativescript/local-notifications'
import { Color, isAndroid } from '@nativescript/core'

async function onActionTap() {
    try {
        if (!LocalNotifications.hasPermission()){
            console.log('requestPermission')
            await LocalNotifications.requestPermission()
        }
        let scheduledIds = await LocalNotifications.schedule([
            {
                id: 1, // generated id if not set
                title: 'The title',
                body: 'Recurs every minute until cancelled',
                ticker: 'The ticker',
                color: new Color('red'),
                badge: 1,
                groupedMessages: [
                    'The first',
                    'Second',
                    'Keep going',
                    'one more..',
                    'OK Stop',
                ], //android only
                groupSummary: 'Summary of the grouped messages above', //android only
                ongoing: true, // makes the notification ongoing (Android only)
                icon: 'res://heart',
                image:
                    'https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg',
                thumbnail: true,
                interval: 'minute',
                channel: 'My Channel', // default: 'Channel'
                sound: isAndroid ? 'customsound' : 'customsound.wav',
                at: new Date(new Date().getTime() + 10 * 1000), // 10 seconds from now
            },
        ])
        console.log('Notification id(s) scheduled: ' + JSON.stringify(scheduledIds))
    } catch (error) {
        console.log('scheduling error: ' + error)
    }
}
</script>
