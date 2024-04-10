import { createApp } from 'nativescript-vue'
import Home from './views/Home.vue'
import { handleOpenURL, AppURL } from '@nativescript-community/appurl'

handleOpenURL((appURL: AppURL) => {
    console.log('Got the following appURL', appURL);
});

createApp(Home).start()

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();