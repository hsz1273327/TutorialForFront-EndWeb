import { createApp, $navigateTo, createNativeView } from 'nativescript-vue';
import { isIOS, Frame, Application, LaunchEventData, AndroidApplication, AndroidActivityBundleEventData, AndroidActivityEventData } from '@nativescript/core';
import { themer, installMixins } from '@nativescript-community/ui-material-core';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'
import { AppShortcuts } from "ns-shortcuts";
import { router } from "~/router/router";

import Home from './views/Main.vue'

let appShortcuts = new AppShortcuts();

appShortcuts.available().then(available => {
    if (available) {
        console.log("This device supports app shortcuts");
    } else {
        console.log("No app shortcuts capability, ask the user to upgrade :)");
    }
});


installMixins()

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');

}

appShortcuts.setQuickActionCallback(shortcutItem => {
    console.log(`get QuickActionCallback`)
    switch (shortcutItem.type) {
        case "eye":
            {
                setTimeout(() => {
                    router.push("/page1", {
                        frame: "main-frame"
                    })
                    console.log(`get shortcutItem.type eye`)
                })
            }
            break;
        case "beer":
            {
                setTimeout(() => {
                    router.push("/page2", {
                        frame: "main-frame"
                    })
                    console.log(`get shortcutItem.type eye`)
                })
            }
            break;
        default:
            {
                setTimeout(() => {
                    router.push("/", { frame: "main-frame" }),
                        console.log(`get unknown shortcutItem.type ${shortcutItem.type}`)
                })
            }
            break;
    }
})

let app = createApp(Home).use(router).use(BottomNavigationBar)
// let app = createApp(Home)
app.start();