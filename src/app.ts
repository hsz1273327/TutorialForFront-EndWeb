import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";


import Home from './views/Main_BottomSheet.vue'

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
installBottomsheet();
installUIDrawer()
imageInitialize({isDownsampleEnabled: true});
createApp(Home).use(TabsPlugin).use(BottomNavigationBar).use(ButtonPlugin).use(BottomSheetPlugin).use(DrawerPlugin).use(ImageModulePlugin).start();