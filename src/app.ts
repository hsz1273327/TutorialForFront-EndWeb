import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';

// import Home from './views/Page_show_status.vue'
// import Home from './views/Page_show_status_page.vue'
//import Home from './views/Page_pull_to_refresh.vue'
// import Home from './views/Page_show_progress.vue'
// import Home from './views/Page_show_snackbar.vue'
// import Home from './views/Page_show_banner.vue'
import Home from './views/Page_show_dialog.vue'
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}


registerElement('PullToRefresh', () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh);

createApp(Home).use(ActivityIndicatorPlugin).use(ProgressPlugin).start();