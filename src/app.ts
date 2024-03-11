import { createApp, registerElement } from 'nativescript-vue';

// import Home from './views/HomeCamera.vue'
import Home from './views/HomeVideoRecorder.vue'
registerElement(
    'Fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
)
registerElement('VideoPlayer', () => require('nativescript-videoplayer').Video)
createApp(Home).start();