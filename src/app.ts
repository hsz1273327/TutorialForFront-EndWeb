import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import WebViewPlugin from '@nativescript-community/ui-webview/vue';

// import Home from './views/Page_show_webview.vue'
import Home from './views/Page_show_awebview.vue'


if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).use(WebViewPlugin).start();
