import { createRouter } from "router-vue-native";
import Home from "~/views/HomePage.vue";
import Page1 from "~/views/Page1.vue";
import Page2 from "~/views/Page2.vue";
const routes = [
    {
        path: "/",
        component: Home,
        frame: "main-frame",
        beforeEnter: (to, from, next) => {
            console.log(`to ${to.path} from ${from.path}`) //from mount @ ${from.component}`)
        }
    },
    {
        path: "/page1",
        component: Page1,
        frame: "main-frame",
        beforeEnter: (to, from, next) => {
            console.log(`to ${to.path} from ${from.path}`) //from mount @ ${from.component}`)
        }
    },
    {
        path: "/page2",
        component: Page2,
    }
];

const router = createRouter(
    { routes },
    {
        routeBackFallbackPath: "/",
        // routeToCallback: (toRouteItem, options) => {
        //     console.log(`to ${toRouteItem.path}`)
        // }
    }
);

router.beforeEach((to,from) => {
    // For example, verify per route access rules
    console.log(`beforeEach to ${to.path} event ${to.resolveOnEvent}`)
    if (from){
        console.log(`beforeEach from ${from.path}`)
    }
  });

router.afterEach((to,from)=>{
    console.log(`afterEach to ${to.path} event ${to.resolveOnEvent}`)
    if (from){
        console.log(`afterEach from ${from.path}`)
    }
})

export {
    router
}