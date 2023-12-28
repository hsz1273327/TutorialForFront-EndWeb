<template>
    <Page actionBarHidden="true" id="HomePage">
        <StackLayout>
            <Label text="Home"></Label>
        </StackLayout>
    </Page>
</template>
    
<script lang="ts" setup>
import { onMounted } from "nativescript-vue";

onMounted(() => console.log("&&&&mounted home frame"))
</script>