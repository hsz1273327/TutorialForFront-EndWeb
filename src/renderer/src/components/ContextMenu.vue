<template>
  <div v-if="visible" class="custom-context-menu"
    :style="{ top: y + 'px', left: x + 'px', position: 'fixed', zIndex: 9999 }" @click.stop>
    <template v-if="type === 'text'">
      <div class="menu-item" @click="onMenuClick('复制')">复制</div>
    </template>
    <template v-else-if="type === 'image'">
      <div class="menu-item" @click="onMenuClick('复制')">复制</div>
      <div class="menu-item" @click="onMenuClick('保存')">保存</div>
    </template>
    <template v-else-if="type === 'video'">
      <div class="menu-item" @click="onMenuClick('保存')">保存</div>
    </template>
    <template v-else-if="type === 'anchor'">
      <div class="menu-item" @click="onMenuClick('复制')">复制</div>
      <div class="menu-item" @click="onMenuClick('浏览器打开')">浏览器打开</div>
    </template>
    <template v-else-if="type === 'input'">
      <div class="menu-item" @click="onMenuClick('黏贴')">黏贴</div>
    </template>
    <template v-else>
      <div class="menu-item" @click="onMenuClick('功能1')">功能1</div>
    </template>
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
  selectionStart?: number | null
  selectionEnd?: number | null
}>()

const emit = defineEmits(['menu-click'])

function onMenuClick(action: string): void {
  emit('menu-click', action, props.type, props.value, props.selectionStart, props.selectionEnd)
}
</script>

<style scoped>
.custom-context-menu {
  background: #222;
  color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
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