import { createApp, registerElement } from 'nativescript-vue';
import { BarcodeView } from '@nativescript-community/ui-barcodeview'
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";
    
import Home from './views/Home.vue'
registerElement('BarcodeView', () => BarcodeView)
installBottomsheet();
createApp(Home).use(BottomSheetPlugin).start();