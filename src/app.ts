import { createApp } from 'nativescript-vue';
import Home from './views/Home.vue'
import { Application, ApplicationEventData,LaunchEventData } from '@nativescript/core'


Application.on('launch', (evt: ApplicationEventData) => {
    console.log(`application get launch event: eventName:${evt.eventName} android:${evt.android} ios:${evt.ios}`)
})

Application.on('suspend', (evt: ApplicationEventData) => {
    console.log(`application get suspend event: eventName:${evt.eventName} android:${evt.android} ios:${evt.ios}`)
})
Application.on('resume', (evt: ApplicationEventData) => {
    console.log(`application get resume event: eventName:${evt.eventName} android:${evt.android} ios:${evt.ios}`)
})

createApp(Home).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();