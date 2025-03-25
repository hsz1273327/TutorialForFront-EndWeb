import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  Notification,
  Tray,
  nativeImage,
  Menu,
  MenuItem
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// 系统托盘设置
function init_tray(): void {
  // macos推荐尺寸为16x16
  const tray_icon = nativeImage.createFromPath(icon).resize({ width: 16, height: 16 })
  const tray = new Tray(tray_icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
    { label: '退出', type: 'normal', click: (): void => app.quit() }
  ])
  tray.setContextMenu(contextMenu)
  //设置鼠标指针在托盘图标上悬停时显示的文本(linux下不支持)
  tray.setToolTip('This is my application')
  // 设置macos中显示在状态栏中托盘图标旁边的标题
  // tray.setTitle('This is my title')
}

// 增加菜单功能
function init_application_menu(mainWindow: BrowserWindow): void {
  const menu = new Menu()
  menu.append(
    new MenuItem({
      label: '关闭到后台',
      submenu: [
        {
          role: 'help',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: (): void => {
            console.log('Electron rocks!')
            new Notification({
              title: 'test electron app message',
              body: `submenu help clicked`
            }).show()
          }
        }
      ]
    })
  )
  menu.append(
    new MenuItem({
      label: 'Electron-1',
      submenu: [
        {
          role: 'quit',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: (): void => {
            console.log('Electron rocks!')
            new Notification({
              title: 'test electron app message',
              body: `submenu help clicked`
            }).show()
          }
        }
      ]
    })
  )
  Menu.setApplicationMenu(menu)
  // 确保显示菜单
  mainWindow.setMenuBarVisibility(true)
  mainWindow.setAutoHideMenuBar(false)
}
// 设置macos下dock的行为
function init_dock(): void {
  app.dock.setIcon(icon)
  app.dock.setBadge('my application')
  app.dock.setMenu(
    Menu.buildFromTemplate([
      { label: 'New Window', click: (): void => console.log('New Window') },
      { label: 'New Window with Settings', submenu: [{ label: 'Basic' }, { label: 'Pro' }] },
      { label: 'New Command...' }
    ])
  )
}

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  const mainwindow = createWindow()
  init_application_menu(mainwindow)
  init_tray()
  if (process.platform !== 'darwin') {
    init_dock()
  }
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 生命周期监听
app.on('browser-window-blur', (_event, window) => {
  console.log(`${window.id} browser-window-blur`)
})
app.on('browser-window-focus', (_event, window) => {
  console.log(`${window.id} browser-window-focus`)
  new Notification({
    title: 'test electron app message',
    body: `${window.id} browser-window-focus`
  }).show()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
