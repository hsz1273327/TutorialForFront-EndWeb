import { createRouter } from "router-vue-native";
import Home from "~/pages/Home.vue";
import Details from "~/pages/Details.vue";
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/details",
        component: Details
    }
];

const router = createRouter(
    { routes },
    {
        routeBackFallbackPath: "/",
    }
);

interface Route {
    path: string;
    meta: Record<string, any>;
}

router.beforeEach((to: Route, from: Route) => {
    let from_props = null
    if (typeof (from.meta.props) !== "undefined") {
        from_props = JSON.stringify(from.meta.props)
    }
    let to_props = null
    if (typeof (to.meta.props) !== "undefined") {
        to_props = JSON.stringify(to.meta.props)
    }
    console.log(`from ${from.path} with props ${from_props} to ${to.path} with props ${to_props} `)
});
export {
    router
}