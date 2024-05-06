import { createApp, registerElement } from 'nativescript-vue';
import { GestureRootView, install as GestureInstall } from '@nativescript-community/gesturehandler';
import Home from './views/Home.vue'

GestureInstall(true)
registerElement(
    'GestureRootView', () => GestureRootView
)
createApp(Home).start();