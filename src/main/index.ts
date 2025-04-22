// 单窗口应用
import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { OptionValues } from 'commander'
import sleep from 'await-sleep'
import { init_linux } from './linux_init'
import { getSetting, Setting, setSetting, cleanSetting } from './setting'
import { getCmdOptions } from './cmd_operate'
import { createWindow, showWindow, setFocusWindow } from './window_operate'
import { app_soft_quit } from './app_operate'

const options = getCmdOptions()
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
app.disableHardwareAcceleration()
// 检查是否已经有实例在运行
const gotTheLock = app.requestSingleInstanceLock(options)

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
      showWindow()
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
      showWindow()
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
    setFocusWindow(window)
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
