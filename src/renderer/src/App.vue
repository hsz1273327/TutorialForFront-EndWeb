<template>
  <Titlebar v-if="showTitleBar" />
  <RouterView default="" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Titlebar from './components/Titlebar.vue'
import { useRenderSetting } from './stores/render-setting'

const render_setting_store = useRenderSetting()
const { showTitleBar } = storeToRefs(render_setting_store)
const { updateRenderSetting } = render_setting_store

window.api.onUpdateRenderSetting((setting) => {
  updateRenderSetting(setting)
  console.log('onUpdateRenderSetting:', setting)
})

window.api.onSetOpacity((value) => {
  console.log('opacity:', value)
  // document.body.style.opacity = value.toString()
  document.body.style.backgroundColor = `rgba(0, 0, 0, ${value})`
})
</script>
