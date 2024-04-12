<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="Check Available" @tap="checkAvailable" />
                <Button text="CheckBio" @tap="checkBio" />
                <TextField v-model="textFieldValue" hint="Enter secret..." @returnPress="encrypting" />
                <Button text="get the secret" @tap="decrypting" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { EventData, isAndroid, ApplicationSettings, isIOS } from '@nativescript/core'
import { Feedback, FeedbackPosition } from "nativescript-feedback"
import { BiometricAuth, ERROR_CODES } from "@nativescript/biometrics";
const feedback = new Feedback();
var biometricAuth = new BiometricAuth();

const textFieldValue = ref("set your secret")

async function checkAvailable(evt: EventData) {
    try {
        let avail = await biometricAuth.available()
        await feedback.info({
            message: `status: ${JSON.stringify(avail)}`,
            position: FeedbackPosition.Top,
            duration: 2000
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
                        position: FeedbackPosition.Top,
                        duration: 2000
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
                    position: FeedbackPosition.Top,
                    duration: 2000
                });
            } else {
                await feedback.warning({
                    message: `Biometric ID not OK with code ${result.code}`,
                    position: FeedbackPosition.Top,
                    duration: 2000
                });
            }
        } else {
            await feedback.warning({
                message: "not available",
                position: FeedbackPosition.Top,
                duration: 2000
            });
        }
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}
const keyName = 'MySecretKeyName'
async function encrypting(evt: EventData) {
    try {
        let avail = await biometricAuth.available()
        if (isIOS) {
            if (avail.touch) {
                // 如果生物识别是指纹识别
                let changed = await biometricAuth.didBiometricDatabaseChange()
                if (changed) {
                    await feedback.warning({
                        message: `need to auth again`,
                        position: FeedbackPosition.Top,
                        duration: 2000
                    });
                    return
                }
            }
        }
        if (avail.any) {
            let result = await biometricAuth.verifyBiometric({
                message: 'Scan your finger',
                fallbackMessage: 'Enter your PIN',
                pinFallback: false,
                keyName: keyName, // The name of the key that will be created/used
                secret: textFieldValue.value,
            })
            if (result.code === ERROR_CODES.SUCCESS) {
                if (isAndroid) {
                    // android中需要自己维护秘key
                    const key_store = { "decryptText": result.encrypted, "iv": result.iv }
                    console.log(`android get key store ${JSON.stringify(key_store)}`)
                    ApplicationSettings.setString(keyName, JSON.stringify(key_store))
                }
                await feedback.warning({
                    message: "Biometric ID OK",
                    position: FeedbackPosition.Top,
                    duration: 2000
                });
            } else {
                await feedback.warning({
                    message: `Biometric ID not OK with code ${result.code}`,
                    position: FeedbackPosition.Top,
                    duration: 2000
                });
            }
        } else {
            await feedback.warning({
                message: "not available",
                position: FeedbackPosition.Top,
                duration: 2000
            });
        }
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}

async function decrypting(evt: EventData) {
    try {
        let avail = await biometricAuth.available()
        if (isIOS) {
            if (avail.touch) {
                // 如果生物识别是指纹识别
                let changed = await biometricAuth.didBiometricDatabaseChange()
                if (changed) {
                    await feedback.warning({
                        message: `need to auth again`,
                        position: FeedbackPosition.Top,
                        duration: 2000
                    });
                    return
                }
            }
        }
        if (avail.any) {
            let query = {
                message: 'Scan your finger',
                fallbackMessage: 'Enter your PIN',
                pinFallback: false,
                keyName: keyName, // The name of the key that will be created/used
            }
            if (isAndroid) {
                const key_store_str = ApplicationSettings.getString(keyName, "")
                if (key_store_str == "") {
                    await feedback.warning({
                        message: `no keystore yet`,
                        position: FeedbackPosition.Top,
                        duration: 2000
                    });
                    return
                }
                const key_store = JSON.parse(key_store_str)
                Object.assign(query, {
                    android: key_store
                })
            } else {
                Object.assign(query, {
                    ios: { fetchSecret: true }
                })
            }
            let result = await biometricAuth.verifyBiometric(query)
            if (result.code === ERROR_CODES.SUCCESS) {

                await feedback.info({
                    message: `Get Secret ${result.decrypted}`,
                    position: FeedbackPosition.Top,
                    duration: 2000
                });
            } else {
                await feedback.warning({
                    message: `Biometric ID not OK with code ${result.code}`,
                    position: FeedbackPosition.Top,
                    duration: 2000
                });
            }
        } else {
            await feedback.warning({
                message: "not available",
                position: FeedbackPosition.Top,
                duration: 2000
            });
        }
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}
</script>
