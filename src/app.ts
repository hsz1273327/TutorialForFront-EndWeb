import { createApp, registerElement } from 'nativescript-vue';
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";
installBottomsheet();


import Home from './views/HomeCamera.vue'
// import Home from './views/HomeVideoRecorder.vue'

registerElement('VideoPlayer', () => require('nativescript-videoplayer').Video)
registerElement('BarcodeView', () => require('@nativescript-community/ui-barcodeview').BarcodeView)
createApp(Home).use(BottomSheetPlugin).start();