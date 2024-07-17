import { createApp, registerElement } from 'nativescript-vue'
import { themer } from '@nativescript-community/ui-material-core'
import { ColorWheel } from '@sergeymell/nativescript-color-wheel'
import Home from './views/Home.vue'


if (global.isIOS) {
    themer.setPrimaryColor('#bff937')
    themer.setAccentColor('#ff8a39')
    themer.setSecondaryColor('#a830d7')
}


registerElement('ColorWheel', () => ColorWheel)
createApp(Home).start()