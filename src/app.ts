import { createApp } from 'nativescript-vue';
import Home from './views/Home.vue'
import { LocalNotifications, ReceivedNotification } from '@nativescript/local-notifications'

LocalNotifications.addOnMessageReceivedCallback((notification: ReceivedNotification) => {
    //Handle the received notification
    console.log(`MessageReceived title ${notification.title}`);
}).then(() => {
    console.log('Listener added');
});

createApp(Home).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();