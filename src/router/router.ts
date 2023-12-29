import { createRouter } from "router-vue-native";
import Home from "~/views/HomePage.vue";
import Page1 from "~/views/Page1.vue";
import Page2 from "~/views/Page2.vue";
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/page1",
        component: Page1
    },
    {
        path: "/page2",
        component: Page2
    }
];

const router = createRouter(
    { routes },
    {
        routeBackFallbackPath: "/",
    }
);
export {
    router
}