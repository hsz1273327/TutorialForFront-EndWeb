import { createApp, registerElement } from 'nativescript-vue';
import Home from './views/nativeHttpHome.vue'

registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
)
createApp(Home).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();