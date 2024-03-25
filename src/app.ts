import { createApp } from 'nativescript-vue'
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3'
import { install as installBottomsheet } from "@nativescript-community/ui-material-bottomsheet"
installBottomsheet()
import Home from './views/Home.vue'

createApp(Home).use(BottomSheetPlugin).start()

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();