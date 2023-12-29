import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'

import { router } from "~/router/router";

import Home from './views/Main.vue'

if (global.isIOS) {
    themer.setPrimaryColor('#3F51B5');
    themer.setAccentColor('#65ADF1');
    themer.setSecondaryColor('#a830d7');
}

let app = createApp(Home).use(router).use(BottomNavigationBar)

app.start();