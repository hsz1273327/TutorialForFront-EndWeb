import { createApp, registerElement } from 'nativescript-vue';
import { Application, ApplicationEventData } from '@nativescript/core'
import { createPinia } from 'pinia'
import Home from './views/Root.vue';
// for orm
import { installMixins } from '@nativescript-community/sqlite/typeorm';
// for orm
import { router } from "~/router";
import { CloseWorker, StartSendInterval } from "./store/time"

installMixins();
registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
)

Application.on("displayed", (args: ApplicationEventData) => {
    console.log("*************displayed")
    StartSendInterval(1000)
    console.log("*************displayed ok")
})
Application.on("exit", (args: ApplicationEventData) => {
    console.log("*************exiting")
    CloseWorker()
    console.log("*************exit ok")
})
createApp(Home).use(createPinia()).use(router).start();