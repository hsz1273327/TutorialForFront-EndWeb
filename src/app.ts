import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'
import DrawerPlugin from '@nativescript-community/ui-drawer/vue3'
import { install as installUIDrawer} from '@nativescript-community/ui-drawer'

// import Home from './views/ActionBarHome.vue';
// import Home from './views/TabHome.vue';
// import Home from './views/TabFrameHome.vue';
// import Home from './views/MaterialTabHome.vue';
import Home from './views/SegmentedBarHome.vue';
// import Home from './views/MDBottomNavigationBarHome.vue';

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

installUIDrawer()

createApp(Home).use(TabsPlugin).use(BottomNavigationBar).use(DrawerPlugin).start();