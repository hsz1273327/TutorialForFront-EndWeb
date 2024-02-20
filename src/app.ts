import { createApp, registerElement } from 'nativescript-vue';


import Home from './views/Home.vue'

registerElement("AutoFitText", ()=>require("@nativescript/auto-fit-text").AutoFitText)

createApp(Home).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();