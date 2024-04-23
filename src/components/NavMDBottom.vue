<template>
    <MDBottomNavigationBar activeColor="#e57373" badgeColor="#1976d2" :selectedTabIndex="selectedTabIndex"
        @tabSelected="onBottomNavigationTabSelected">
        <template v-for="item in pages">
            <MDBottomNavigationTab :title=item.title />
        </template>
    </MDBottomNavigationBar>
</template>
    
<script lang="ts" setup>
import { ref,defineProps  } from 'nativescript-vue'
import { TabSelectedEventData } from "@nativescript-community/ui-material-bottomnavigationbar";
import { useRouter } from "router-vue-native";

const props = defineProps(["selectedTabIndex"])
// get router
const router = useRouter();
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

let selected = false
function onBottomNavigationTabSelected(args: TabSelectedEventData) {
    if (selected) {
        selected = false
    } else {
        if (args.newIndex == props.selectedTabIndex){
            return
        }
        selected = true
        try {
            let path = pages.value[args.newIndex].path
            let opt = {
                frame: "main-frame"
            }
            router.push(path, opt)
        } catch (e) {
            console.log(`unknown index ${args.newIndex}`);
        }
    }
}
</script>