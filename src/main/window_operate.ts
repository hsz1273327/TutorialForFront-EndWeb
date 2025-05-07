// 单窗口应用
import { shell, BrowserWindow, ThumbarButton } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import { getSetting } from './setting'

let mainWindow: BrowserWindow | null = null
let createWindow: (() => BrowserWindow) | null = null
// 创建窗口的工厂函数
function createWindowFactory(thumbarButtons: ThumbarButton[]): () => BrowserWindow {
  const _create_window = (): BrowserWindow => {
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
            mainWindow = null
            console.log('Window destroy')
          }
        }
      }
    })

    Window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    if (thumbarButtons && thumbarButtons.length > 0) {
      Window.setThumbarButtons(thumbarButtons)
    }

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      Window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      Window.loadFile(join(__dirname, '../renderer/index.html'))
    }
    mainWindow = Window
    return Window
  }
  createWindow = _create_window
  return _create_window
}

function showWindow(): void {
  if (mainWindow) {
    mainWindow.show() // 显示窗口
    if (mainWindow.isMinimized()) {
      mainWindow.restore() // 如果窗口最小化，恢复窗口
    }
    mainWindow.focus() // 将窗口置于焦点
  } else {
    console.log('mainWindow is null')
    if (createWindow) {
      mainWindow = createWindow()
    } else {
      console.log('createWindow is null')
      createWindowFactory([])()
    }
  }
}

function sendToMainWindow(channel: string, ...args: unknown[]): void {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, ...args)
  } else {
    console.log('mainWindow is null')
  }
}

function publish(channel: string, ...args: unknown[]): void {
  for (const win of BrowserWindow.getAllWindows()) {
    if (win && !win.isDestroyed()) {
      win.webContents.send(channel, ...args)
    }
  }
}

export { createWindowFactory, showWindow, sendToMainWindow, publish }
