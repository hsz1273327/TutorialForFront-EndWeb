import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';


import Home from './views/Page_show_html.vue'
// import Home from './views/Page_show_webview.vue'
// import Home from './views/Page_show_ui_webview.vue'


if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).start();
