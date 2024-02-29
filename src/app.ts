import { createApp, registerElement } from 'nativescript-vue';
import Home from './views/Root.vue';
// for orm
import { installMixins } from '@nativescript-community/sqlite/typeorm';
// for orm
import { router } from "~/router";
installMixins();
registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
)
createApp(Home).use(router).start();