import { createApp, registerElement } from 'nativescript-vue';

import Home from './views/HomeCamera.vue'
// import Home from './views/HomeVideoRecorder.vue'

registerElement('VideoPlayer', () => require('nativescript-videoplayer').Video)
createApp(Home).start();