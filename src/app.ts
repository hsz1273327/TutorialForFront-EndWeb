import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue';
import CheckBoxPlugin from '@nativescript-community/ui-checkbox/vue';
import DateTimePickerPlugin from "@nativescript/datetimepicker/vue";
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';
import SekkBarPlugin from '@nativescript-community/ui-range-seek-bar/vue'
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue'

// import Home from './views/Page_input_button.vue'
// import Home from './views/Page_input_choose.vue'
// import Home from './views/Page_input_choose_time.vue'
// import Home from './views/Page_input_slider.vue'
// import Home from './views/Page_input_text.vue'
import Home from './views/Page_input_textios.vue'

registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
)
registerElement('PreviousNextView', () => require('@nativescript/iqkeyboardmanager').PreviousNextView);
registerElement('TextViewWithHint', () => require('@nativescript/iqkeyboardmanager').TextViewWithHint);
registerElement('KeyboardToolbar', () => require('@nativescript/keyboard-toolbar').Toolbar);


if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

createApp(Home).use(ButtonPlugin).use(FloatingActionButtonPlugin).use(speeddialPlugin).use(CheckBoxPlugin).use(DateTimePickerPlugin).use(SliderPlugin).use(SekkBarPlugin).use(TextFieldPlugin).start();
