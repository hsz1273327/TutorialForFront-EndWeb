import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue';

import Home from './views/Page_show_button.vue'

registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
)
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).use(ButtonPlugin).use(FloatingActionButtonPlugin).use(speeddialPlugin).start();
