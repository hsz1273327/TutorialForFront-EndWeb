import { createApp,ref } from 'nativescript-vue'
import Home from './views/Home.vue'
// import { createPinia } from 'pinia'
import { Application, isAndroid, Device } from '@nativescript/core'
import { androidLaunchEventLocalizationHandler } from '@nativescript/localize'
// import { useLanguageStore } from './store/language'
let app = createApp(Home)
const languageChangedMessage = ref("")
app.provide(/* 注入名 */ 'languageChangedMessage', /* 值 */ languageChangedMessage)
Application.on(Application.launchEvent, (args) => {
    if (args.android) {
        try {
            androidLaunchEventLocalizationHandler()
            // const store = useLanguageStore()
            // const { languageChange } = store
            let nowlanguage = Device.language.split('-')[0]
            languageChangedMessage.value="language changed"
            console.log(`androidLaunchEventLocalizationHandler languageChanged`)
        } catch (error) {
            console.log(`androidLaunchEventLocalizationHandler get error ${error}`)
        }
    }
})



app.start() //.use(createPinia())