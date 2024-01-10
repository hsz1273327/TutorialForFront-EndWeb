import { createApp } from 'nativescript-vue';
import Home from './views/Home.vue';
// for orm
import { installMixins } from '@nativescript-community/sqlite/typeorm';
// for orm
installMixins();
createApp(Home).start();