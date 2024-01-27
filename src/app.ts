import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import { Video } from 'nativescript-videoplayer'
// import Home from './views/PickHome.vue'
import Home from './views/Home.vue'

if (global.isIOS) {
  themer.setPrimaryColor('#bff937');
  themer.setAccentColor('#ff8a39');
  themer.setSecondaryColor('#a830d7');
}
registerElement('VideoPlayer', () => Video)
createApp(Home).start();