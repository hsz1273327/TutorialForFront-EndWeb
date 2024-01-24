import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';
import ImageModulePlugin from '@nativescript-community/ui-image/vue';
import { initialize as imageInitialize } from '@nativescript-community/ui-image';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';
import waterfallInstall from '@nativescript-community/ui-collectionview-waterfall';


// import Home from './views/ListView_Home.vue'
// import Home from './views/CollectionView_Home.vue'
import Home from './views/Waterfall_Home.vue'

if (global.isIOS) {
  themer.setPrimaryColor('#bff937');
  themer.setAccentColor('#ff8a39');
  themer.setSecondaryColor('#a830d7');
}
registerElement(
  'PullToRefresh',
  () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
)

imageInitialize({ isDownsampleEnabled: true });
waterfallInstall();
createApp(Home).use(CardViewPlugin).use(ImageModulePlugin).use(CollectionView).start();