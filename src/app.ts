import { createApp } from 'nativescript-vue'
import Home from './views/Home.vue'
// import { handleOpenURL, AppURL } from '@nativescript-community/appurl'
import { registerUniversalLinkCallback, getUniversalLink } from "@nativescript-community/universal-links";
import * as urlparse from 'url-parse';

// handleOpenURL((appURL: AppURL) => {
//     console.log('Got the following appURL', appURL);
// });

const ul = getUniversalLink()

console.log(`getUniversalLink ${ul}`)

registerUniversalLinkCallback((ul: string) => {
    // use the router to navigate to the screen
    console.log(`get url ${ul}`)
    const url = urlparse(ul, true)
    console.log(`url parsed as ${JSON.stringify(url)}`)
});

createApp(Home).start()
