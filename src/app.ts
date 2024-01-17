import { createApp, registerElement } from 'nativescript-vue';
import { themer, installMixins } from '@nativescript-community/ui-material-core';
import Theme from "@nativescript-community/css-theme";

Theme.setMode(Theme.Dark)

import Home from './views/Home.vue';
// import Home from './views/tween.vue';

installMixins();
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).start();
