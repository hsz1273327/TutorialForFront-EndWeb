<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <StackLayout>
                    <Button text="Request Permissions" @tap="requestPermissions" />
                </StackLayout>
                <StackLayout>
                    <Button text="Pick Document" @tap="getAll" />
                </StackLayout>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'nativescript-vue'
import { File, TextField, EventData, isAndroid } from '@nativescript/core';
import { Contacts } from '@nativescript/contacts';
import { request } from '@nativescript-community/perms';

async function getAll() {
    const contactFields = ['name', 'phoneNumbers'];
    try {
        let res = Contacts.getAllContacts(contactFields)

    } catch (error) {
        console.error(error)
    }
}

async function requestPermissions() {
    if (isAndroid) {
        console.log("android query Permissions")
        try {
            const result = await request({ contacts: {} })
            console.log(`get result ${JSON.stringify(result)}`)
        } catch (error) {
            console.log(`get error ${error.message}`)
        }
    }
}
</script>
