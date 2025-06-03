<template>
  <div id="titlebar" class="titlebar">
    <div class="titlebar-drag-region"></div>
    <div class="titlebar-buttons">
      <!-- 下拉菜单按钮 -->
      <button class="titlebar-button" @click="toggleMenu">
        ☰
      </button>
      <div v-if="menuVisible" class="dropdown-menu" :class="{ 'macos-dropdown': isMacOS }">
        <button @click="modifyConfig">修改配置</button>
        <button @click="about">关于</button>
      </div>

      <!-- 最小化按钮 -->
      <button v-if="!isMacOS" class="titlebar-button" @click="minimizeWindow">
        _
      </button>

      <!-- 最大化/还原按钮 -->
      <button v-if="!isMacOS" class="titlebar-button" @click="toggleMaximizeWindow">
        □
      </button>

      <!-- 关闭按钮 -->
      <button v-if="!isMacOS" class="titlebar-button" @click="closeWindow">
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRenderSetting } from '../stores/render-setting'
import Mousetrap from 'mousetrap'
const render_setting_store = useRenderSetting()
const { isMacOS } = storeToRefs(render_setting_store)

// 控制下拉菜单的显示状态
const menuVisible = ref(false)

// 切换下拉菜单的显示状态
const toggleMenu = (): void => {
  menuVisible.value = !menuVisible.value
}

// // 修改配置的逻辑
const modifyConfig = (): void => {
  console.log('修改配置按钮被点击')
}

const about = (): void => {
  console.log('关于按钮被点击')
}

// 最小化窗口
const minimizeWindow = (): void => {
  window.api.windowControl('minimize')
}

// 最大化或还原窗口
const toggleMaximizeWindow = (): void => {
  window.api.windowControl('maximize')
}

// 关闭窗口
const closeWindow = (): void => {
  window.api.windowControl('close')
}

onMounted(() => {
  Mousetrap.bind(isMacOS.value ? 'alt+command+i' : 'alt+shift+i', about)
})

onUnmounted(() => {
  Mousetrap.unbind(isMacOS.value ? 'alt+command+i' : 'alt+shift+i')
})
</script>

<style scoped>
.titlebar {
  user-select: none;
  -webkit-app-region: drag;
  /* 允许拖动窗口 */
  height: 30px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  /* 固定定位 */
  top: 0;
  /* 固定在顶部 */
  left: 0;
  /* 从左侧开始 */
  width: 100%;
  /* 宽度占满整个窗口 */
  z-index: 1000;
  /* 确保标题栏在最上层 */
}

.titlebar-drag-region {
  flex: 1;
}

.titlebar-buttons {
  display: flex;
  align-items: center;
}

.titlebar-button {
  -webkit-app-region: no-drag;
  /* 禁止按钮区域拖动 */
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.titlebar-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dropdown-menu {
  position: absolute;
  top: 30px;
  right: 40px;
  background-color: #444;
  color: white;
  border: 1px solid #555;
  padding: 5px;
  z-index: 1000;
}

/* 针对 macOS 的样式 */
.macos-dropdown {
  right: 10px;
}

.dropdown-menu button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  text-align: left;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>