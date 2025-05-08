// 单窗口应用
import { shell, BrowserWindow, ThumbarButton, Menu, MenuItemConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'
import { getSetting } from './setting'

const defaultMenuTemplate: MenuItemConstructorOptions[] = [
  {
    label: '文件',
    submenu: [
      {
        label: '退出',
        role: 'quit' // 使用内置角色
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { label: '撤销', role: 'undo' },
      { label: '重做', role: 'redo' },
      { type: 'separator' },
      { label: '剪切', role: 'cut' },
      { label: '复制', role: 'copy' },
      { label: '粘贴', role: 'paste' }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: (): void => {
          console.log('关于菜单被点击')
        }
      }
    ]
  }
]

let mainWindow: BrowserWindow | null = null
let createWindow: (() => BrowserWindow) | null = null
// 创建窗口的工厂函数
function createWindowFactory(thumbarButtons: ThumbarButton[]): () => BrowserWindow {
  const _create_window = (): BrowserWindow => {
    const setting = getSetting()
    let Window: BrowserWindow
    if (setting.window_menu_type === 'custom') {
      // Create the browser window.
      Window = new BrowserWindow({
        title: 'helloworld',
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden', // 隐藏默认标题栏
        transparent: true, // 透明窗口
        frame: false, // 移除窗口边框（可选）
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      })
    } else {
      // Create the browser window.
      Window = new BrowserWindow({
        title: 'helloworld',
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: false,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      })
      const menu = Menu.buildFromTemplate(defaultMenuTemplate)
      Menu.setApplicationMenu(menu) // 设置全局菜单
    }
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

    Window.on('blur', () => {
      // linux下无效
      Window.setOpacity(0.8)
    })

    Window.on('focus', () => {
      Window.setOpacity(1)
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
    Window.webContents.once('did-finish-load', () => {
      console.log('Window did-finish-load')
      const setting = getSetting()
      const showMenu = setting.window_menu_type === 'custom' // 如果是 custom，则不显示菜单
      Window.webContents.send('update-menu-visibility', showMenu)
      console.log(`did-finish-load ${showMenu}`)
    })
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

function updateWindowMenuType(): void {
  if (mainWindow) {
    if (mainWindow && createWindow) {
      mainWindow.destroy() // 销毁当前窗口
      mainWindow = null
      createWindow()
    }
  }
}

// 窗口抖动特效
function shakeWindow(window: BrowserWindow): void {
  if (!window || window.isDestroyed()) return

  const bounds = window.getBounds() // 获取窗口的当前位置和大小
  const x = bounds.x
  const y = bounds.y

  let i = 0
  const interval = setInterval(() => {
    const offset = i % 2 === 0 ? 10 : -10 // 偏移量
    window.setBounds({
      x: x + offset,
      y: y,
      width: bounds.width,
      height: bounds.height
    })
    i++
    if (i > 5) {
      // 抖动 3 次后停止
      clearInterval(interval)
      window.setBounds(bounds) // 恢复到原始位置
    }
  }, 50) // 每 50 毫秒改变一次位置
}

function shakeMainWindow(): void {
  if (mainWindow) {
    shakeWindow(mainWindow)
  }
}

export {
  createWindowFactory,
  showWindow,
  sendToMainWindow,
  publish,
  updateWindowMenuType,
  shakeWindow,
  shakeMainWindow
}
