<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <StackLayout>
                    <Button text="Request Permissions" @tap="requestPermissions" />
                </StackLayout>
                <StackLayout>
                    <Button text="Pick Document" @tap="getAll" />
                    <SearchBar hint="Search..." @submit="getByName" />
                </StackLayout>
                <ScrollView v-show="hasContacts">
                    <StackLayout padding="12">
                        <template v-for="(item, key) in contacts" :key="key">
                            <StackLayout height="100">
                                <Label :text="item.displayname" />
                                <template v-for="(num, key1) in item.phoneNumbers" :key="key1">
                                    <Label :text="num" @tap="showContactBar(num)" />
                                </template>
                            </StackLayout>
                        </template>
                    </StackLayout>
                </ScrollView>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue'
import { isAndroid, EventData, SearchBar } from '@nativescript/core';
import { Contacts } from '@nativescript/contacts';
import { request } from '@nativescript-community/perms';
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";
import ContactBottomBar from "../components/ContactBottomBar.vue";
const { showBottomSheet } = useBottomSheet()

const contacts = ref([])
const hasContacts = computed(() => {
    return contacts.value.length > 0 ? true : false
})

async function getAll() {
    try {
        const contactFields = ['name', 'phoneNumbers'];
        let res = await Contacts.getAllContacts(contactFields)
        console.log(`get res ${JSON.stringify(res.data)}`)
        contacts.value = res.data.map((i) => {
            return {
                "displayname": i.name.displayname,
                "phoneNumbers": i.phoneNumbers.map((j) => `${j.value}`)
            }
        })
        console.log(`get contacts ${JSON.stringify(contacts.value)}`)
    } catch (error) {
        console.error(error)
    }
}
async function getByName(evt: EventData) {
    try {
        const contactFields = ['name', 'phoneNumbers']
        const searchbar = evt.object as SearchBar
        let res = await Contacts.getContactsByName(searchbar.text, contactFields)
        console.log(`get res ${JSON.stringify(res.data)}`)
        contacts.value = res.data.map((i) => {
            return {
                "displayname": i.name.displayname,
                "phoneNumbers": i.phoneNumbers.map((j) => `${j.value}`)
            }
        })
        console.log(`get contacts ${JSON.stringify(contacts.value)}`)
    } catch (error) {
        console.error(error)
    }
}

async function requestPermissions() {
    if (isAndroid) {
        console.log("android query Permissions")
        try {
            const result = await request({ contacts: {}, callPhone: {} })
            console.log(`get result ${JSON.stringify(result)}`)
        } catch (error) {
            console.log(`get error ${error.message}`)
        }
    }
}

function showContactBar(phoneNumber: string) {
    showBottomSheet(ContactBottomBar, {
        dismissOnBackgroundTap: true,
        props: {
            canCloseBottomSheet: true,
            phoneNumber: phoneNumber,
        }
    });
}
</script>
