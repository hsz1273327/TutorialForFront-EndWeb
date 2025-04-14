import { app, shell, BrowserWindow, ipcMain, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { Command,Option } from 'commander'
import icon from '../../resources/icon.png?asset'
import sleep from 'await-sleep'
import { init_linux } from './linux_init'

// 创建窗口
function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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

function make_cmd():Command {
  const program = new Command()
  program
    .option('--port <number>', '指定端口号', '3000') // 默认端口为 3000
    .option('--debug', '启用调试模式', false) // 默认不启用调试模式
    .addOption(new Option('--usercmd <char>', '测试命令').choices(['cmd1', 'cmd2', 'cmd3']))
    .description('Electron 应用程序')
  return program
}
// 定义命令行参数
const program = make_cmd()
// 解析命令行参数
program.parse(process.argv)
const options = program.opts()
console.log('解析的参数:', options)


let mainWindow: BrowserWindow | null = null

// 检查是否已经有实例在运行
const gotTheLock = app.requestSingleInstanceLock(options)

if (!gotTheLock) {
  // 如果获取锁失败，说明已经有实例在运行，退出当前实例
  app.quit()
} else {
  // 如果获取锁成功，说明没有实例在运行,继续执行
  // 监听第二个实例的启动事件
  app.on('second-instance', (_event, _argv,_path,additionalData) => {
    // 当用户尝试启动第二个实例时触发
    console.log(`second-instance, additionalData:`,additionalData)

    // 如果应用已经创建了窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore() // 如果窗口最小化，恢复窗口
      }
      mainWindow.focus() // 将窗口置于焦点
    }

  })
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')
    // 从命令行参数中获取参数
    console.log('options.port', options.port)
    console.log('options.debug', options.debug)
    
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
    // IPC test
    ipcMain.on('ping', async () => {
      console.log('pong wait 10s')
      await sleep(10000)
      console.log('pong ok')
    })

    mainWindow = createWindow()
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
}





