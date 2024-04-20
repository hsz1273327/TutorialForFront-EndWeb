import { createApp, $navigateTo } from 'nativescript-vue';
import { isIOS, Frame } from '@nativescript/core';
import { themer, installMixins } from '@nativescript-community/ui-material-core';
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue'
import { AppShortcuts } from "nativescript-app-shortcuts";
import { useRouter } from "router-vue-native";
import { FrameBase } from '@nativescript/core/ui/frame/frame-common';

if (!isIOS) {
    Frame.prototype.onUnloaded = function () {
        FrameBase.prototype.onUnloaded.call(this, arguments);
    };
}

// // instantiate the plugin
let appShortcuts = new AppShortcuts();

appShortcuts.available().then(available => {
    if (available) {
        console.log("This device supports app shortcuts");
    } else {
        console.log("No app shortcuts capability, ask the user to upgrade :)");
    }
});

appShortcuts.configureQuickActions([
    {
        type: "capturePhoto",
        title: "Snag a pic",
        subtitle: "You have 23 snags left", // iOS only
        iconType: isIOS ? UIApplicationShortcutIconType.CapturePhoto : null,
        iconTemplate: "eye" // ignored by iOS, if iconType is set as well
    },
    {
        type: "beer",
        title: "Beer-tastic!",
        subtitle: "Check in & share", // iOS only
        iconTemplate: "beer"
    }
]).then(() => {
    console.log("Added 2 actions, close the app and apply pressure to the app icon to check it out!");
}, (errorMessage) => {
    console.log(errorMessage);
});



import { router } from "~/router/router";

import Home from './views/Main.vue'


installMixins();
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
// https://github.com/NativeScript/NativeScript/issues/8126
appShortcuts.setQuickActionCallback(shortcutItem => {
    console.log(`The app was launched by shortcut type '${shortcutItem.type}'`);

    // this is where you handle any specific case for the shortcut
    if (shortcutItem.type === "beer") {
        // router.push("/page2", {
        //     frame: "main-frame"
        // })
        console.log(`get shortcutItem.type beer`)
    } else {
        console.log(`get shortcutItem.type ${shortcutItem.type}`)
        // // Frame.getFrameById("main-frame")
        // // .. any other shortcut handling
        setTimeout(() => {
            router.push("/", { frame: "main-frame" })
        })
    }

});

let app = createApp(Home).use(router).use(BottomNavigationBar)

app.start();