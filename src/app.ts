import { createApp,ref } from 'nativescript-vue'
import Home from './views/Home.vue'
import { Application, isAndroid, Device } from '@nativescript/core'
import { androidLaunchEventLocalizationHandler } from '@nativescript/localize'

let app = createApp(Home)
const languageChangedMessage = ref("")
app.provide(/* 注入名 */ 'languageChangedMessage', /* 值 */ languageChangedMessage)

Application.on(Application.launchEvent, (args) => {
    if (args.android) {
        try {
            androidLaunchEventLocalizationHandler()
            let nowlanguage = Device.language.split('-')[0]
            languageChangedMessage.value="language changed"
            console.log(`androidLaunchEventLocalizationHandler languageChanged`)
        } catch (error) {
            console.log(`androidLaunchEventLocalizationHandler get error ${error}`)
        }
    }
})

app.start()