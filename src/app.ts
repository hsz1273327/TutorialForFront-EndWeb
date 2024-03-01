import { createApp, registerElement } from 'nativescript-vue';
// import { init as bghttp_init } from '@nativescript/background-http'

// import Home from './views/nativeHttpHome.vue'
// import Home from "./views/communityHttpHome.vue"
// import Home from "./views/wsHome.vue"
import Home from "./views/mqttHome.vue"

import '@valor/nativescript-websockets'

registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
)
// bghttp_init()
createApp(Home).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();