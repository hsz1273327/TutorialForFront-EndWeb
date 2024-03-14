import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue'
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";
import { install as installPersistentBottomsheet } from '@nativescript-community/ui-persistent-bottomsheet';
import PersistentBottomSheetPlugin from '@nativescript-community/ui-persistent-bottomsheet/vue';

// import Home from './views/SpeedDialHome.vue'
// import Home from './views/PopoverHome.vue'
// import Home from './views/BottomSheetHome.vue'
import Home from './views/PersistentBottomSheetHome.vue'


if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
installBottomsheet();
installPersistentBottomsheet();

createApp(Home).use(speeddialPlugin).use(BottomSheetPlugin).use(PersistentBottomSheetPlugin).start();