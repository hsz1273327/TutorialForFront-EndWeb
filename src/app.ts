import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';

import Home from './views/Page_show_status.vue'

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).use(ActivityIndicatorPlugin).start();