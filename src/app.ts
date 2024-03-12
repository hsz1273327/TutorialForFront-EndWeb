import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue'
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";


// import Home from './views/Main_BottomSheet.vue'
import Home from './views/SpeedDialHome.vue'

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
installBottomsheet();

createApp(Home).use(speeddialPlugin).use(BottomSheetPlugin).start();