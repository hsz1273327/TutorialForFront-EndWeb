import TestComponents from "./components/TestComponents.vue"
import { myvuepluginobj } from "./provides"
import { myvuepluginfunc } from "./properties"
interface MyvuepluginOptions {
    withComponents?: boolean
}
export default {
    install: (app, options: MyvuepluginOptions) => {
        app.provide("myvueplugin", myvuepluginobj)
        app.config.globalProperties.$myvuepluginfunc = myvuepluginfunc
        if (options.withComponents) {
            app.component("TestComponents", () => TestComponents)
        }
    }
}
//# sourceMappingURL=index.js.map