<template>
    <h1>这是一个测试,prop是 {{ foo }}</h1>
</template>


<script lang="ts" setup>
import { defineProps } from "vue"

const props = defineProps(['foo'])
</script>