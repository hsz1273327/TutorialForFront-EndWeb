import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import PickerField from '@nativescript/picker/vue';

// import Home from './views/PickHome.vue'
import Home from './views/SearchHome.vue'

if (global.isIOS) {
  themer.setPrimaryColor('#bff937');
  themer.setAccentColor('#ff8a39');
  themer.setSecondaryColor('#a830d7');
}

//.use(PickerField) 
createApp(Home).start();