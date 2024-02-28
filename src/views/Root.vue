<template>

</template>

<script lang="ts" setup>
import {
  ref,
  $navigateTo,
  onBeforeMount,
  onUnmounted
} from 'nativescript-vue';

import { Init, Close} from "../models/Flick_orm";
//for other
onBeforeMount(() => {
  Init()
})

onUnmounted(() => Close())
</script>


<style>
/* .info {
    font-size: 20;
  } */
</style>
