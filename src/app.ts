import { createApp, registerElement } from 'nativescript-vue';
import { themer } from '@nativescript-community/ui-material-core';
import {  Label as HTMLLabel } from '@nativescript-community/ui-label';
import CanvasLabel from '@nativescript-community/ui-canvaslabel/vue';
import ImageModulePlugin from '@nativescript-community/ui-image/vue';
import { initialize as imageInitialize} from '@nativescript-community/ui-image';
import CanvasSVG from '@nativescript-community/ui-svg/vue';
import { Gif } from 'nativescript-gif';
import { BlurView } from '@nativescript-community/ui-blurview';
import { PDFView } from '@nativescript/pdf'

// import { MarkdownView } from "nativescript-markdown-view"

imageInitialize({isDownsampleEnabled: true});

registerElement('HTMLLabel', () => HTMLLabel);
registerElement('Gif', () => Gif);
registerElement('BlurView', () => BlurView);
registerElement("AutoFitText", ()=>require("@nativescript/auto-fit-text").AutoFitText)
registerElement('PDFView', () => PDFView);
// registerElement('MarkdownView', () =>MarkdownView)
// import Home from './views/Page_show_label.vue'
// import Home from './views/Page_show_image.vue'
// import Home from './views/Page_show_gif.vue'
// import Home from './views/Page_show_svg.vue'
import Home from './views/Page_show_pdf.vue'
// import Home from './views/Page_show_markdown.vue'

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
    // enableIOSDTCoreText()
}

createApp(Home).use(CanvasLabel).use(ImageModulePlugin).use(CanvasSVG).start();

// createApp(Home).use(ImageModulePlugin).use(CanvasSVG).start();