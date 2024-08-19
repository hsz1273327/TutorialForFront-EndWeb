import { createApp, registerElement } from 'nativescript-vue'
import { themer } from '@nativescript-community/ui-material-core'
import { ColorWheel } from '@hsz1273327/nativescript-color-wheel'
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';
import Home from './views/Home.vue'


if (global.isIOS) {
    themer.setPrimaryColor('#bff937')
    themer.setAccentColor('#ff8a39')
    themer.setSecondaryColor('#a830d7')
}


registerElement('ColorWheel', () => ColorWheel)
createApp(Home).use(SliderPlugin).start()