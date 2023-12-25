import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';

// import Home from './views/Main_simple.vue';
//import Home from './views/Main_simple_mf.vue';
// import Home from './views/Main_material_tabs.vue';
import Home from './views/Main_sb.vue';

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).use(TabsPlugin).start();