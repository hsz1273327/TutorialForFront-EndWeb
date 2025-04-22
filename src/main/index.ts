// 单窗口单实例应用
import { app, shell, BrowserWindow, ipcMain, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import sleep from 'await-sleep'
import { init_linux } from './linux_init'

//禁用显卡加速避免报错
app.disableHardwareAcceleration()

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', async () => {
    console.log('pong wait 10s')
    await sleep(10000)
    console.log('pong ok')
  })

  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  if (process.platform === 'linux' && !is.dev) {
    // 仅在 Linux 上执行
    console.log('Linux platform detected')
    await init_linux()
  }
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
