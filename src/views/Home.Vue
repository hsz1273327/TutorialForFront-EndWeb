<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="Check Can Send Email" @tap="checkEmail" />
                <Button text="Send Email" @tap="sendEmail" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData, } from '@nativescript/core'
import { available, compose } from '@nativescript/email'


async function checkEmail() {
    try {
        let avail = await available()
        console.log('Email available? ' + avail)
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}

async function sendEmail(evt: EventData) {
    try {
        let result = await compose({
            subject: 'Yo',
            body: 'Hello <strong>dude</strong> :)',
            to: ['eddyverbruggen@gmail.com', 'to@person2.com'],
            cc: ['ccperson@somewhere.com'],
            bcc: ['eddy@combidesk.com', 'eddy@x-services.nl'],
            attachments: [
                {
                    fileName: 'arrow1.png',
                    path: 'base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC',
                    mimeType: 'image/png',
                }
            ],
        })
        console.log(`Email composer closed with result ${result}`)
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}
</script>
