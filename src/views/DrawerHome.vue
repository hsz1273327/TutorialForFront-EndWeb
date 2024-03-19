<template>
    <Frame>
        <Page>
            <Drawer ref="drawer" @open="showOpen" @close="showClose">
                <MemberInfo ~leftDrawer member="左侧" />
                <MemberInfo ~rightDrawer member="右侧" />
                <MemberInfo ~topDrawer member="顶部" />
                <MemberInfo ~bottomDrawer member="底部" />
                <StackLayout ~mainContent backgroundColor="white">
                    <Button @tap="onOpenDrawer('left')" text="Open Left Drawer" width="250" marginTop="25" />
                    <Button @tap="onOpenDrawer('right')" text="Open Right Drawer" width="250" marginTop="25" />
                    <Button @tap="onOpenDrawer('top')" text="Open Top Drawer" width="250" marginTop="25" />
                    <Button @tap="onOpenDrawer('bottom')" text="Open Bottom Drawer" width="250" marginTop="25" />
                </StackLayout>
            </Drawer>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref } from "nativescript-vue";
import MemberInfo from '../components/MemberInfo.vue'

const drawer = ref()
function onOpenDrawer(side: string) {
    drawer.value._nativeView.open(side)
}
interface DrawerEvent {
    side: string;
    duration: number;
}

function showOpen(evt: DrawerEvent) {
    console.log(`open ${evt.side} on ${evt.duration}`)
}

function showClose(evt: DrawerEvent) {
    console.log(`close ${evt.side} on ${evt.duration}`)
}
</script>