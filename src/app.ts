import { createApp } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';
import ImageModulePlugin from '@nativescript-community/ui-image/vue';
import { initialize as imageInitialize} from '@nativescript-community/ui-image';
import CollectionView from '@nativescript-community/ui-collectionview/vue3';

import Home from './views/CollectionView_Home.vue'
// import Home from './views/CollectionView_Home.vue'
// import Home from './views/CollectionView_Home.vue'

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

imageInitialize({isDownsampleEnabled: true});
createApp(Home).use(CardViewPlugin).use(ImageModulePlugin).use(CollectionView).start();