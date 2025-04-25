<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="echoHandle()">Send echo</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="queryNowTime()">刷新时间</a>
    </div>
  </div>
  <p class="tip">应用的apppath为: {{ appPath }}</p>
  <p class="tip">应用的app-data-path为: {{ appDataPath }}</p>
  <p v-if="nowTime" class="tip">
    当前上次更新时间: <strong> {{ nowTime }}</strong>
  </p>
  <Versions />
</template>

<script setup lang="ts">
import Versions from './components/Versions.vue'
import { onBeforeMount, ref } from 'vue'

const appPath = ref('')
const appDataPath = ref('')
const nowTime = ref('')

async function getAppPath(): Promise<void> {
  const _appPath = await window.api.getAppPath()
  appPath.value = _appPath
}
async function getAppDataPath(): Promise<void> {
  const _appDataPath = await window.api.getAppDataPath()
  appDataPath.value = _appDataPath
}
async function getBrowserSupport(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false
  } else {
    try {
      const result = await Notification.requestPermission()
      console.log(result)
    } catch (e) {
      console.log('Notification requestPermission error:', e)
      return false
    }
    return true
  }
}
async function echoHandle(): Promise<void> {
  console.log('querying echo')
  const result = await window.api.echo('hello')
  console.log(result)
  let notification = new window.Notification('测试echo请求结果', {
    body: result,
    requireInteraction: true
  })
  notification.onclose = (): void => console.log('消息关闭了')
}

function queryNowTime(): void {
  console.log('querying now time')
  window.api.pull('nowtime')
}

window.api.onUpdateNowTime((value) => {
  nowTime.value = value
  let notification = new window.Notification('测试推送当前时间', {
    body: value,
    requireInteraction: true
  })
  notification.onclose = (): void => console.log('消息关闭了')
})

onBeforeMount(async () => {
  await getBrowserSupport()
  await getAppPath()
  await getAppDataPath()
})
</script>
