<template>
    <Frame>
        <Page>
            <PullToRefresh @refresh="refreshList">
                <ListView :items="listOfItems">
                    <template #default="{ item }">
                        <StackLayout padding="10 20">
                            <label :text="item.text" />
                        </StackLayout>
                    </template>
                </ListView>
            </PullToRefresh>
        </Page>
    </Frame>
</template>
  
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
const listOfItems = ref([{
    text: "item0",
}, {
    text: "item1",
}, {
    text: "item2",
}, {
    text: "item3",
}])
function refreshList(args) {
    var pullRefresh = args.object;
    setTimeout(function () {
        pullRefresh.refreshing = false;
    }, 1000);
}
</script>