import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet";

// import Home from './views/Main_simple.Vue';
// import Home from './views/Main_simple_mf.Vue';
// import Home from './views/Main_material_tabs.Vue';
// import Home from './views/Main_sb.Vue';
// import Home from './views/Main_MDBottomNavigationBar.vue';
import Home from './views/Main_BottomSheet.vue'
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
installBottomsheet();
createApp(Home).use(TabsPlugin).use(BottomNavigationBar).use(BottomSheetPlugin).start();