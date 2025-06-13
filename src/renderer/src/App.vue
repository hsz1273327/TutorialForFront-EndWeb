<template>
  <Titlebar v-if="showTitleBar" />
  <div class="title">Electron-Vite-Vue3-TypeScript</div>

  <img v-if="isWayland" alt="logo" class="logo" src="./assets/electron.svg" />
  <img v-else alt="logo" class="logo draggablelink" src="./assets/electron.svg" @dragstart="handleDragStart" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p v-if="isWayland" class="tip">
    Please try pressing <code>F12</code> to open the devTool
  </p>
  <p v-else class="tip draggable" draggable="true" @dragstart="handleDragStart">
    Please try pressing <code>F12</code> to open the devTool
  </p>
  <div class="actions">
    <div class="action">
      <a v-if="isWayland" href="https://electron-vite.org/" target="_blank" rel="noreferrer">
        Documentation
      </a>
      <a v-else class="draggablelink" href="https://electron-vite.org/" target="_blank" rel="noreferrer"
        @dragstart="handleDragStart">
        Documentation
      </a>
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
  <input type="text" :value="input_value" />

  <ContextMenu :visible="contextMenu.visible" :x="contextMenu.x" :y="contextMenu.y" :type="contextMenu.type"
    :value="contextMenu.value" :selectionStart="contextMenu.selectionStart" :selectionEnd="contextMenu.selectionEnd"
    @menu-click="onMenuClick" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Titlebar from './components/Titlebar.vue'
import Versions from './components/Versions.vue'
import ContextMenu from './components/ContextMenu.vue'
import { getEventSource } from './utils'
import { useRenderSetting } from './stores/render-setting'

const render_setting_store = useRenderSetting()
const { showTitleBar, customContextMenu, isWayland } = storeToRefs(render_setting_store)
const { updateRenderSetting } = render_setting_store
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
  console.log('drag over preventDefault called')
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

function handleDragStart(event: DragEvent): void {
  event.preventDefault()
  console.log('Drag started')
  const notification = new window.Notification('测试Drag', {
    body: 'Drag started, you can drag files into the app',
    requireInteraction: true
  })
  notification.onclose = (): void => console.log('消息关闭了')
  const sourceinfo = getEventSource(event)
  console.log('sourceinfo:', sourceinfo)
  try {
    const tempfilepath = window.api.dragAsFile(sourceinfo)
    console.log('Drag started temp file path:', tempfilepath)
  } catch (error) {
    const notification = new window.Notification('Drag error', {
      body: 'Drag get error: ' + error,
      requireInteraction: true
    })
    notification.onclose = (): void => console.log('消息关闭了')
  }
}

const contextMenu = ref<{
  visible: boolean,
  x: number,
  y: number,
  type: string,
  value: string,
  selectionStart: number | null,
  selectionEnd: number | null
}>({
  visible: false,
  x: 0,
  y: 0,
  type: '',
  value: '',
  selectionStart: null,
  selectionEnd: null
})

function showContextMenu(event: MouseEvent,
  type = '',
  value = '',
  selectionStart: number | null = null,
  selectionEnd: number | null = null
): void {
  console.log("&&&&&&&&&&&&&&&")
  console.log(`selectionStart:${selectionStart}`)
  console.log(`selectionEnd:${selectionEnd}`)
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    type,
    value,
    selectionStart: selectionStart,
    selectionEnd: selectionEnd
  }
}
function hideContextMenu(): void {
  console.log('hideContextMenu called')
  if (customContextMenu.value) {
    contextMenu.value.visible = false
  }
}
const input_value = ref("")

async function onMenuClick(action: string, type?: string, value?: string, selectionStart?: number | null, selectionEnd?: number | null): Promise<void> {
  hideContextMenu()
  // 这里可以根据 action/type/value 做不同处理
  console.log('Menu clicked:', action, type, value)
  if (action === '保存') {
    if (!value) {
      console.error('No value provided for save action')
      return
    }
    await window.api.saveAs(value)
  } else if (action === '浏览器打开') {
    if (!value) {
      console.error('No value provided for browser open action')
      return
    }
    await window.api.openInBrowser(value)
  } else if (action === '复制') {
    if (!value) {
      console.error('No value provided for browser open action')
      return
    }
    if (type === 'image') {
      await window.api.clearClipboard()
      await window.api.writeImageToClipboard(value)
    } else if (type === 'text') {
      await window.api.clearClipboard()
      await window.api.writeTextToClipboard(value)
    } else if (type === 'anchor') {
      await window.api.clearClipboard()
      await window.api.writeTextToClipboard(value)
    } else {
      console.error(`unsupported type ${type}`)
      return
    }
    await window.api.openInBrowser(value)
  } else if (action === '黏贴') {
    if (type === 'input') {
      const insert = await window.api.readTextFromClipboard()
      if (selectionStart !== null && selectionEnd !== null) {
        const newValue =
          input_value.value.slice(0, selectionStart) +
          insert +
          input_value.value.slice(selectionEnd)
        input_value.value = newValue
      }
    }
  } else {
    console.log('执行其他操作:', action)
  }
}

// 处理右键菜单事件
async function handleContextMenu(event: MouseEvent): Promise<void> {
  event.preventDefault()
  try {
    const target = getEventSource(event)
    if (target.type == 'image') {
      console.log('右键图片', target.source)
      if (customContextMenu.value) {
        showContextMenu(event, 'image', target.source)
      } else {
        await window.api.openContentMenu('image', target.source)
      }
    } else if (target.type == 'video') {
      console.log('右键视频', target.source)
      if (customContextMenu.value) {
        showContextMenu(event, 'video', target.source)
      } else {
        await window.api.openContentMenu('video', target.source)
      }
    } else if (target.type == 'anchor') {
      console.log('右键链接', target.source)
      if (customContextMenu.value) {
        showContextMenu(event, 'anchor', target.source)
      } else {
        await window.api.openContentMenu('anchor', target.source)
      }
    } else if (target.type == 'input') {
      console.log('右键输入框', target.source)
      if (customContextMenu.value) {
        showContextMenu(event, 'input', target.source, target.selectionStart, target.selectionEnd)
      } else {
        await window.api.openContentMenu('input', target.source)
      }
    } else if (target.type == 'text') {
      console.log('右键文本', target.source)
      if (customContextMenu.value) {
        showContextMenu(event, 'text', target.source)
      } else {
        await window.api.openContentMenu('text', target.source)
      }
    }
  } catch (_err) {
    console.log('右键其它元素')
    if (customContextMenu.value) {
      showContextMenu(event)
    } else {
      await window.api.openContentMenu()
    }
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
window.api.onUpdateRenderSetting((setting) => {
  updateRenderSetting(setting)
  console.log('onUpdateRenderSetting:', setting)
})

window.api.onSetOpacity((value) => {
  console.log('opacity:', value)
  // document.body.style.opacity = value.toString()
  document.body.style.backgroundColor = `rgba(0, 0, 0, ${value})`
})

onBeforeMount(async () => {
  await getBrowserSupport()
  await getAppPath()
  await getAppDataPath()
})
onMounted(() => {
  window.addEventListener('dragover', preventDefault)
  window.addEventListener('drop', handleDrop)
  window.addEventListener('contextmenu', handleContextMenu)
  window.addEventListener('click', hideContextMenu)

})

onBeforeUnmount(() => {
  window.removeEventListener('dragover', preventDefault)
  window.removeEventListener('drop', handleDrop)
  window.removeEventListener('contextmenu', handleContextMenu)
  window.removeEventListener('click', hideContextMenu)
})
</script>
