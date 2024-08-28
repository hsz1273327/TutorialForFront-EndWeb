import TestComponents from "./components/TestComponents.vue";
import { myvuepluginobj } from "./provides";
import { myvuepluginfunc } from "./properties";
export const MyVuePlugin = {
    install: (app, options) => {
        app.provide("myvueplugin", myvuepluginobj);
        app.config.globalProperties.$myvuepluginfunc = myvuepluginfunc;
        if (options.withComponents) {
            app.component("TestComponents", () => TestComponents);
        }
        else {
            for (let [k, v] of Object.entries(options)) {
                if (k == "withComponents") {
                    continue;
                }
                else {
                    app.component(k, () => v);
                }
            }
        }
    }
};
//# sourceMappingURL=index.js.map