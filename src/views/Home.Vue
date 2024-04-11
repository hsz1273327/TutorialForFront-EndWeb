<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="Check Available" @tap="checkAvailable" />
                <Button text="CheckBio" @tap="checkBio" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData, isIOS } from '@nativescript/core'
import { Feedback, FeedbackPosition } from "nativescript-feedback"
import { BiometricAuth, ERROR_CODES } from "@nativescript/biometrics";
const feedback = new Feedback();
var biometricAuth = new BiometricAuth();


async function checkAvailable(evt: EventData) {
    try {
        let avail = await biometricAuth.available()
        feedback.info({
            message: `status: ${JSON.stringify(avail)}`,
            position: FeedbackPosition.Top
        });
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}
async function checkBio(evt: EventData) {
    try {
        let avail = await biometricAuth.available()
        if (isIOS) {
            if (avail.touch) {
                // 如果生物识别是指纹识别
                let changed = await biometricAuth.didBiometricDatabaseChange()
                if (changed) {
                    await feedback.warning({
                        message: `need to auth again`,
                        position: FeedbackPosition.Top
                    });
                    return
                }
            }
        }
        if (avail.any) {
            let result = await biometricAuth.verifyBiometric({
                message: 'Scan your finger',
                fallbackMessage: 'Enter your PIN',
                pinFallback: true,
            })
            if (result.code === ERROR_CODES.SUCCESS) {
                await feedback.warning({
                    message: "Biometric ID OK",
                    position: FeedbackPosition.Top
                });
            } else {
                await feedback.warning({
                    message: `Biometric ID not OK with code ${result.code}`,
                    position: FeedbackPosition.Top
                });
            }
        } else {
            await feedback.warning({
                message: "not available",
                position: FeedbackPosition.Top
            });
        }
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}
</script>
