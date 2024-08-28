import TestComponents from "./components/TestComponents.vue"
import { myvuepluginobj } from "./provideobjs"
import { myvuepluginfunc } from "./globalfuncs"
export default {
    install: (app, options) => {
        app.provide("myvueplugin", myvuepluginobj)
        app.config.globalProperties.$myvuepluginfunc = myvuepluginfunc
        if (options.withComponents) {
            app.component("TestComponents", () => TestComponents)
        }
    }
}
//# sourceMappingURL=index.js.map