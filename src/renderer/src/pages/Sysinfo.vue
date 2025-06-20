<template>
  <ul class="sysinfo">
    <li class="platform-sysinfo">Platform{{ platform }}</li>
    <li class="arch-sysinfo">Arch {{ arch }}</li>
    <li class="timeZone-sysinfo">timeZone {{ timeZone }}</li>
    <li class="systemLanguage-sysinfo">systemLanguage {{ systemLanguage }}</li>
    <li class="cpu-sysinfo">Cpu {{ cpuInfo.manufacturer }}</li>
    <li class="memory-sysinfo">memory {{ memorySize }}</li>
    <li class="fs-sysinfo">
      fsInfo of App {{ fsInfo.mount }}: {{ fsInfo.free }}/{{ fsInfo.total }}
    </li>
    <li v-if="graphics" class="graphics-sysinfo">graphics {{ graphics[0].model }}</li>
  </ul>
  <div class="action">
    <a target="_blank" rel="noreferrer" @click="goBack()">返回</a>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRenderSetting } from '../stores/render-setting'
import { useRouter } from 'vue-router'

const router = useRouter()
const render_setting_store = useRenderSetting()
const { platform, arch, cpuInfo, memorySize, timeZone, systemLanguage, fsInfo, graphics } = storeToRefs(render_setting_store)

function goBack(): void {
  router.back()
}

onMounted(() => {
  console.log(`get setting ${platform.value}`)
})
</script>
