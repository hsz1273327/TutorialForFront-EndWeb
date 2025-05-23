<template>
  <Titlebar v-if="titlebarvisible" />
  <div class="title">Electron-Vite-Vue3-TypeScript</div>
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

    <div class="action">
      <a target="_blank" rel="noreferrer" @click="querySaveFile()">保存测试文件</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="queryOpenFile()">打开文件</a>
    </div>
  </div>
  <p class="tip">应用的apppath为: {{ appPath }}</p>
  <p class="tip">应用的app-data-path为: {{ appDataPath }}</p>
  <p v-if="nowTime" class="tip">
    当前上次更新时间: <strong> {{ nowTime }}</strong>
  </p>
  <Versions />
  <pre>{{ fileContent }}</pre>
</template>

<script setup lang="ts">
import Titlebar from './components/Titlebar.vue'
import Versions from './components/Versions.vue'
import { onMounted, onBeforeMount, onBeforeUnmount, ref } from 'vue'

const appPath = ref('')
const appDataPath = ref('')
const nowTime = ref('')
const titlebarvisible = ref(false)

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
const fileContent = ref('')
async function queryOpenFile(): Promise<void> {
  console.log('querying open file')
  const file = await window.api.openFile()
  fileContent.value = file.content
}

async function querySaveFile(): Promise<void> {
  console.log('querying open dir')
  await window.api.saveFile('hello world')
  fileContent.value = 'save file test.txt ok'
}

function preventDefault(event: Event): void {
  event.preventDefault()
}
async function handleDrop(event: DragEvent): Promise<void> {
  console.log('handleDrop start')
  event.preventDefault()
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0]
    // 通过 preload 暴露的 api 发送路径
    const content = await window.api.readFile(file)
    console.log('file content:', content)
    fileContent.value = content
  }
}

window.api.onUpdateNowTime((value) => {
  nowTime.value = value
  let notification = new window.Notification('测试推送当前时间', {
    body: value,
    requireInteraction: true
  })
  notification.onclose = (): void => console.log('消息关闭了')
})
window.api.onUpdateMenuVisibility((value) => {
  titlebarvisible.value = value
  console.log('titlebarvisible:', titlebarvisible.value)
})
window.api.onSetOpacity((value) => {
  console.log('opacity:', value)
  // document.body.style.opacity = value.toString()
  document.body.style.backgroundColor = `rgba(0, 0, 0, ${value})`
})

// function isInputElement(target: EventTarget | null): boolean {
//   if (!(target instanceof HTMLElement)) return false
//   // 判断 input、textarea 或 contenteditable
//   return (
//     target.tagName === 'INPUT' ||
//     target.tagName === 'TEXTAREA' ||
//     target.isContentEditable
//   )
// }
// 处理右键菜单事件
async function handleContextMenu(event: MouseEvent): Promise<void> {
  event.preventDefault()
  const target = event.target as HTMLElement
  const selection = window.getSelection()?.toString()

  if (target instanceof HTMLImageElement) {
    console.log('右键图片', target.src)
    await window.api.openContentMenu('image', target.src)
  } else if (target instanceof HTMLVideoElement) {
    console.log('右键视频', target.src)
    await window.api.openContentMenu('video', target.src)
  } else if (target instanceof HTMLAnchorElement) {
    console.log('右键链接', target.href)
    await window.api.openContentMenu('anchor', target.href)
  } else if (selection && selection.length > 0) {
    console.log('右键文本', selection)
    await window.api.openContentMenu('text', selection)
    // } else if (isInputElement(target)) {
    //   console.log('右键输入框', target)
  } else {
    console.log('右键其它元素', target)
    await window.api.openContentMenu()
  }
}

onBeforeMount(async () => {
  await getBrowserSupport()
  await getAppPath()
  await getAppDataPath()
})
onMounted(() => {
  window.addEventListener('dragover', preventDefault)
  window.addEventListener('drop', handleDrop)
  window.addEventListener('contextmenu', handleContextMenu)
})

onBeforeUnmount(() => {
  window.removeEventListener('dragover', preventDefault)
  window.removeEventListener('drop', handleDrop)
  window.removeEventListener('contextmenu', handleContextMenu)
})
</script>
