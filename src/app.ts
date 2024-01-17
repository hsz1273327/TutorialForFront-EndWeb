import { createApp, registerElement } from 'nativescript-vue';
import Home from './views/Home.vue';
import { themer, installMixins } from '@nativescript-community/ui-material-core';
import { BlurView } from '@nativescript-community/ui-blurview';
registerElement('BlurView', () => BlurView)
installMixins();
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).start();
