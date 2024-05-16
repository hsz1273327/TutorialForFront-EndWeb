<template>
    <Frame>
        <Page>
            <ActionBar>
                <Label :text="appName" class="font-bold text-lg bg-black" />
            </ActionBar>
            <StackLayout>
                <Button :text="btnChangeLanguage" @tap="onActionTap" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted, $showModal, inject, watch } from 'nativescript-vue'
import { Utils, isAndroid } from '@nativescript/core'
import { localize, overrideLocale, androidLaunchEventLocalizationHandler } from '@nativescript/localize'
import supportedLanguageModal from '../components/supportedLanguageModal.vue'

// import { storeToRefs } from 'pinia'
// import { useLanguageStore } from '../store/language'

// const store = useLanguageStore()
// const { language } = storeToRefs(store)


declare const exit: (code: number) => void
declare const android: any;

const appName = ref("")
const btnChangeLanguage = ref("")

async function onActionTap() {
    const symbol = await $showModal(supportedLanguageModal, {
        fullscreen: false,
    })
    await alert({
        title: localize("alert.title"),
        message: localize("alert.message"),
        okButtonText: localize("alert.okButtonText"),
    })
    const localeOverriddenSuccessfully = overrideLocale(symbol)
    console.log(`change succeed: ${localeOverriddenSuccessfully}`)
    if (isAndroid) {
        // Utils.android.getCurrentActivity().finish()
        setTimeout(()=>android.os.Process.killProcess(android.os.Process.myPid()),100)
    } else {
        exit(0)
    }

}

function updateLocalize() {
    appName.value = localize("app.name")
    btnChangeLanguage.value = localize("btn.changeLanguage")
}
const languageChangedMessage = inject('languageChangedMessage')
watch(languageChangedMessage, (newQuestion) => {
    updateLocalize()
})
onMounted(updateLocalize)
</script>