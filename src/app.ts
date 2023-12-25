import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'

// import Home from './views/Main_simple.Vue';
// import Home from './views/Main_simple_mf.Vue';
// import Home from './views/Main_material_tabs.Vue';
// import Home from './views/Main_sb.Vue';
import Home from './views/Main_MDBottomNavigationBar.vue';

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).use(TabsPlugin).use(BottomNavigationBar).start();