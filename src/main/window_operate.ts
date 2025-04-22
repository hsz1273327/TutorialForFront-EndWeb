import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'

import { getSetting } from './setting'

let lastFocusWindowID: number | null = null

function getMainWindow(): BrowserWindow | null {
  const all_windows = BrowserWindow.getAllWindows()
  if (all_windows.length > 0) {
    let mainWindow: BrowserWindow
    if (lastFocusWindowID) {
      // 如果有记录上一次的焦点窗口，获取焦点窗口
      const lastFocusWindow = BrowserWindow.fromId(lastFocusWindowID)
      if (lastFocusWindow) {
        // 如果上一次的焦点窗口存在
        console.log(`mainWindow is lastFocusWindow ${lastFocusWindowID}`)
        mainWindow = lastFocusWindow
      } else {
        console.log('mainWindow is last, lastFocusWindow is null')
        // 如果上一次的焦点窗口已经不存在，将最后一个窗口作为主窗口处理
        mainWindow = all_windows[all_windows.length - 1]
      }
    } else {
      // 如果没有记录上一次的焦点窗口，将最后一个窗口作为主窗口处理
      console.log('mainWindow is last, without lastFocusWindowID')
      mainWindow = all_windows[all_windows.length - 1]
    }
    return mainWindow
  }
  return null
}
function showWindow(): void {
  const all_windows = BrowserWindow.getAllWindows()
  // 如果应用已经存在窗口,从所有窗口中获取最后一个窗口并显示
  if (all_windows.length > 0) {
    const mainWindow = getMainWindow()
    if (!mainWindow) {
      console.log('mainWindow is null')
      createWindow()
      return
    }
    mainWindow.show() // 显示窗口
    if (mainWindow.isMinimized()) {
      mainWindow.restore() // 如果窗口最小化，恢复窗口
    }
    mainWindow.focus() // 将窗口置于焦点
  } else {
    // 如果窗口不存在，创建新窗口
    console.log('no Window exist,create new window')
    createWindow()
  }
}

// 创建窗口
function createWindow(): BrowserWindow {
  // Create the browser window.
  const Window = new BrowserWindow({
    title: 'helloworld',
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  Window.on('ready-to-show', () => {
    Window.show()
  })
  // 拦截窗口关闭事件
  Window.on('close', (event) => {
    const all_windows = BrowserWindow.getAllWindows()
    if (all_windows.length == 1) {
      // 如果只有一个窗口,检查是否需要拦截
      const setting = getSetting()
      // 检查设置,如果设置为允许后台运行，则拦截
      if (setting.can_background) {
        console.log('Window close event triggered')
        event.preventDefault() // 阻止默认关闭行为
        if (setting.window_hide_as_close) {
          console.log('window_hide_as_close')
          Window.hide() // 隐藏窗口
        } else {
          Window?.destroy() // 销毁窗口对象
          console.log('Window destroy')
        }
      }
    }
  })

  Window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    Window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    Window.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return Window
}

function setFocusWindow(window: BrowserWindow): void {
  lastFocusWindowID = window.id
}
export { createWindow, showWindow, setFocusWindow }
