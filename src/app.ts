import { createApp } from 'nativescript-vue';
import { themer, installMixins } from '@nativescript-community/ui-material-core';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'

import { router } from "~/router/router";

import Home from './views/Main.vue'


installMixins();
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}


let app = createApp(Home).use(router).use(BottomNavigationBar)

app.start();