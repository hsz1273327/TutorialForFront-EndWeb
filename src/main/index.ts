// 单窗口应用
import { app } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { OptionValues } from 'commander'
import { init_linux } from './linux_init'
import { getSetting, Setting, setSetting, cleanSetting } from './setting'
import { getCmdOptions } from './cmd_operate'
import { app_soft_quit } from './app_operate'
import { createWindowFactory, showWindow, sendToMainWindow } from './window_operate'
import { init_ipc } from './ipc'
import { init_tray } from './tray_operate'
import { init_dock } from './dock_operate'
import { init_global_shortcuts } from './golbalshortcut'
import { init_sysinfo} from './sysinfo'

const options = getCmdOptions()

function change_setting_from_cmd(options: OptionValues): void {
  const custom_setting: Setting = {}
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

//避免显卡设置问题,屏蔽使用显卡
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
      //清空还原设置
      if ((additionalData as OptionValues).usercmd === 'cleansetting') {
        // 处理传递的参数
        cleanSetting()
        return
      }
      if ((additionalData as OptionValues).usercmd === 'sendnowtime') {
        // 处理传递的参数
        sendToMainWindow('nowtime', new Date().toLocaleString())
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
    await init_sysinfo()
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
    // 初始化 IPC
    init_ipc()
    // 初始化全局快捷键
    init_global_shortcuts()
    //初始化 dock
    const thumbarButtons = init_dock()

    // 创建窗口
    createWindowFactory(thumbarButtons)()
    // 初始化系统托盘
    init_tray()
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      showWindow()
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
  })

  app.on('window-all-closed', () => {
    const setting = getSetting()
    // if (process.platform !== 'darwin') {
    //   if (!setting.can_background) {
    //     app.quit() // 如果不允许后台运行，退出应用
    //   } else {
    //     console.log('所有窗口已关闭，但应用仍在后台运行')
    //   }
    // }
    if (!setting.can_background) {
      app.quit() // 如果不允许后台运行，退出应用
    } else {
      console.log('所有窗口已关闭，但应用仍在后台运行')
    }
  })
}
