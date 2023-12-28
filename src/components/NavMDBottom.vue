<template>
    <MDBottomNavigationBar activeColor="#e57373" badgeColor="#1976d2" selectedTabIndex="0"
        @tabSelected="onBottomNavigationTabSelected">
        <template v-for="item in pages">
            <MDBottomNavigationTab :title=item.title />
        </template>
    </MDBottomNavigationBar>
</template>
    
<script lang="ts" setup>
import { defineProps, ref } from 'nativescript-vue'
import { TabSelectedEventData } from "@nativescript-community/ui-material-bottomnavigationbar";
import { useRouter } from "router-vue-native";
// get router
const router = useRouter();
// interface PageMap {
//     "title": string
//     "path": string
// }
// interface Props {
//     "frameId": string
//     // "pages": PageMap[]
// }

// const props = defineProps<Props>()
const pages = ref([{
    "title": "Home",
    "path": "/"
}, {
    "title": "Page1",
    "path": "/page1"
}, {
    "title": "Page2",
    "path": "/page2"
}])

function onBottomNavigationTabSelected(args: TabSelectedEventData) {
    try {
        let path = pages.value[args.newIndex].path
        router.push(path,
            {
                frame: "main-frame"
            })
    } catch (e) {
        console.log(`unknown index ${args.newIndex}`);
    }
}
</script>