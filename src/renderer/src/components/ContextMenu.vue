<template>
  <div
    v-if="visible"
    class="custom-context-menu"
    :style="{ top: y + 'px', left: x + 'px', position: 'fixed', zIndex: 9999 }"
    @click.stop
  >
    <div class="menu-item" @click="onMenuClick('复制')">复制</div>
    <div class="menu-item" @click="onMenuClick('粘贴')">粘贴</div>
    <div class="menu-item" @click="onMenuClick('自定义操作')">自定义操作</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  visible: boolean
  x: number
  y: number
  type?: string
  value?: string
}>()

const emit = defineEmits(['menu-click'])

function onMenuClick(action: string) {
  emit('menu-click', action, props.type, props.value)
}
</script>

<style scoped>
.custom-context-menu {
  background: #222;
  color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  min-width: 120px;
  padding: 6px 0;
}
.menu-item {
  padding: 8px 20px;
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background: #444;
}
</style>