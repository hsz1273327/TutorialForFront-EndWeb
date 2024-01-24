import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';


// import Home from './views/ListView_Home.vue'
// import Home from './views/CollectionView_Home.vue'
import Home from './views/Home.vue'

if (global.isIOS) {
  themer.setPrimaryColor('#bff937');
  themer.setAccentColor('#ff8a39');
  themer.setSecondaryColor('#a830d7');
}


createApp(Home).start();