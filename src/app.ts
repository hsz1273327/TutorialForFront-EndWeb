import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';
import DrawerPlugin from '@nativescript-community/ui-drawer/vue3'
import { install as installUIDrawer} from '@nativescript-community/ui-drawer';
import ImageModulePlugin from '@nativescript-community/ui-image/vue';
import { initialize as imageInitialize} from '@nativescript-community/ui-image';

import Home from './views/Main_ActionBar.vue';
// import Home from './views/Main_simple.vue';
// import Home from './views/Main_simple_mf.vue';
// import Home from './views/Main_material_tabs.vue';
// import Home from './views/Main_sb.vue';
// import Home from './views/Main_MDBottomNavigationBar.vue';
// import Home from './views/Main_BottomSheet.vue'
// import Home from './views/Main_ui-drawer.vue'
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
installBottomsheet();
installUIDrawer()
imageInitialize({isDownsampleEnabled: true});
createApp(Home).use(TabsPlugin).use(BottomNavigationBar).use(ButtonPlugin).use(BottomSheetPlugin).use(DrawerPlugin).use(ImageModulePlugin).start();