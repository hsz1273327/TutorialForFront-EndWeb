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
<style scoped>
.app-root {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f7f8fa;
  box-sizing: border-box;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}

.n-layout {
  background: #f7f8fa;
  min-height: 100vh;
  margin-left: 240px;
  /* 侧边栏宽度 */
}

.n-menu {
  background: transparent;
}

.n-layout-content {
  min-height: 0;
  overflow: auto;
}

.n-layout-sider {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.03);
  background: #fff;
  display: flex !important;
  flex-direction: column;
  padding: 0;
  z-index: 10;
}

.n-layout-sider .n-menu {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.sider-bottom {
  padding: 12px 0;
  text-align: center;
}
</style>
