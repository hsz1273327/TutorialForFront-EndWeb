import { createApp, registerElement } from 'nativescript-vue';
// import { WebRTC, WebRTCView} from 'nativescript-webrtc-plugin';
// WebRTC.init(); // <= Try calling this in you app.js or app.ts or main.ts

// import Home from './views/nativeHttpHome.vue'
// import Home from "./views/communityHttpHome.vue"
import Home from "./views/sseHome.vue"
// import Home from "./views/wsHome.vue"
// import Home from "./views/mqttHome.vue"
// import Home from "./views/webrtcMsgHome.vue"

import '@valor/nativescript-websockets'

registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
)

// registerElement(
//     'WebRTCView',
//     () => WebRTCView
// )
// bghttp_init()
createApp(Home).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();