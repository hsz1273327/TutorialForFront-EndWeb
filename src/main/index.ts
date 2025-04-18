// 单窗口应用
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { Command, Option, OptionValues } from 'commander'
import icon from '../../resources/icon.png?asset'
import sleep from 'await-sleep'
import { init_linux } from './linux_init'
import { getSetting, Setting, setSetting, cleanSetting } from './setting'

function make_cmd(): Command {
  const program = new Command()
  program
    .option('--window_limit <number>', '允许的窗口数') // 默认窗口限制数为1
    .option('--can_background', '是否允许后台运行') // 默认不启用调试模式
    .option('--window_hide_as_close', '是否将窗口的关闭改为隐藏') // 默认不启用调试模式
    .addOption(
      new Option('--usercmd <char>', '用户命令').choices(['cleansetting', 'newwindow', 'exit'])
    )
    .description('Electron 应用程序')
  return program
}
// 定义命令行参数
const program = make_cmd()
// 解析命令行参数
program.parse(process.argv)
const options = program.opts()
console.log('解析的参数:', options)

function change_setting_from_cmd(options: OptionValues): void {
  const custom_setting: Setting = {}
  if (options.window_limit !== undefined) {
    // 处理传递的参数
    custom_setting.window_limit = parseInt(options.window_limit)
  }
  if (options.can_background !== undefined) {
    custom_setting.can_background = options.can_background
  }
  if (options.window_hide_as_close !== undefined) {
    custom_setting.window_hide_as_close = options.window_hide_as_close
  }
  if (custom_setting) {
    // 如果有自定义设置，更新设置
    setSetting(custom_setting)
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
// 检查是否已经有实例在运行
const gotTheLock = app.requestSingleInstanceLock(options)

async function app_soft_quit(): Promise<void> {
  await sleep(1000)
  console.log('app_soft_quit')
  const all_windows = BrowserWindow.getAllWindows()
  if (all_windows.length > 0) {
    for (const window of all_windows) {
      window.destroy() // 关闭窗口
    }
  }
  app.quit()
}

if (!gotTheLock) {
  // 如果获取锁失败，说明已经有实例在运行，退出当前实例
  app.quit()
} else {
  // 如果获取锁成功，说明没有实例在运行,继续执行
  // 监听第二个实例的启动事件
  change_setting_from_cmd(options)
  app.on(
    'second-instance',
    (_evt: Electron.Event, _argv: string[], _workingDirectory: string, additionalData: unknown) => {
      // 当用户尝试启动第二个实例时触发
      console.log(`second-instance, additionalData:`, additionalData)
      if ((additionalData as OptionValues).usercmd === 'exit') {
        // 处理传递的参数
        app_soft_quit() // 退出应用
        return
      }
      if ((additionalData as OptionValues).usercmd === 'newwindow') {
        // 处理传递的参数
        const setting = getSetting()
        if (!setting || setting.window_limit === undefined) {
          console.error('setting is null')
          return
        }
        // 如果窗口数量不到限制，则创建新窗口
        if (setting.window_limit >= 1) {
          const all_windows = BrowserWindow.getAllWindows()
          if (all_windows.length < setting.window_limit) {
            console.log('create new window')
            createWindow()
          }
        } else {
          console.log('create new window')
          createWindow()
        }
        return
      }
      //清空还原设置
      if ((additionalData as OptionValues).usercmd === 'cleansetting') {
        // 处理传递的参数
        cleanSetting()
        return
      }

      change_setting_from_cmd(additionalData as OptionValues)

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
  )
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

    createWindow()
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      const all_windows = BrowserWindow.getAllWindows()
      if (all_windows.length === 0) {
        createWindow()
      } else {
        getMainWindow()?.show() // 显示窗口
      }
    })
    if (process.platform === 'linux' && !is.dev) {
      // 仅在 Linux 上执行
      console.log('Linux platform detected')
      init_linux()
    }
  })

  // 生命周期监听
  app.on('browser-window-blur', (_event, window) => {
    console.log(`${window.id} browser-window-blur`)
  })
  app.on('browser-window-focus', (_event, window) => {
    console.log(`${window.id} browser-window-focus`)
    lastFocusWindowID = window.id
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    const setting = getSetting()
    if (process.platform !== 'darwin') {
      if (!setting.can_background) {
        app.quit() // 如果不允许后台运行，退出应用
      } else {
        console.log('所有窗口已关闭，但应用仍在后台运行')
      }
    }
  })
}
