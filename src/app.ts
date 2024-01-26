import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';
import ImageModulePlugin from '@nativescript-community/ui-image/vue';
import { initialize as imageInitialize } from '@nativescript-community/ui-image';
import SwipeMenuPlugin from '@nativescript-community/ui-collectionview-swipemenu/vue3';
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";



import Home from './views/Home.vue'
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

imageInitialize({ isDownsampleEnabled: true });
installBottomsheet();
registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
)
createApp(Home).use(CardViewPlugin).use(ImageModulePlugin).use(BottomSheetPlugin).use(SwipeMenuPlugin).start();