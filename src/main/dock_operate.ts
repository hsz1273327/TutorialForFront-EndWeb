import { app, Menu,BrowserWindow } from 'electron'
import { cleanSetting } from './setting'
import { sendToMainWindow } from './window_operate'
import { app_soft_quit } from './app_operate'
// dock以及windows上的任务栏操作
function init_dock(): void {
  if (process.platform === 'darwin') {
    // macOS
    const dockMenu = Menu.buildFromTemplate([
      { label: '还原设置', type: 'normal' as const, click: (): void => cleanSetting() },
      {
        label: '更新时间',
        type: 'normal' as const,
        click: (): void => sendToMainWindow('nowtime', new Date().toLocaleString())
      },
      {
        label: '退出',
        type: 'normal' as const,
        click: (): void => {
          app_soft_quit()
        }
      }
    ])
    app.dock?.setMenu(dockMenu)
  } else if (process.platform === 'win32') {
    // Windows
    app.setUserTasks([
      {
        program: process.execPath,
        arguments: '--usercmd=cleansetting',
        iconPath: process.execPath,
        iconIndex: 0,
        title: '还原设置',
        description: 'Restore settings'
      },
      {
        program: process.execPath,
        arguments: '--usercmd=sendnowtime',
        iconPath: process.execPath,
        iconIndex: 1,
        title: '更新时间',
        description: 'Update time'
      },
      {
        program: process.execPath,
        arguments: '--usercmd=exit',
        iconPath: process.execPath,
        iconIndex: 2,
        title: '关闭应用',
        description: 'close app'
      }
    ])
  }
  // linux下需要在electron-builder.yml中配置
}
// 让支持的平台实现dock抖动
function dockBounce(): () => void {
  if (process.platform === 'darwin') {
    const id = app.dock?.bounce('critical')
    // const id = app.dock?.bounce('informational')
    console.log('dockBounce', id)
    return () => {
      app.dock?.cancelBounce(id)
      console.log('dockBounce canceled', id)
    }
  } else if (process.platform === 'win32') {
    // Windows
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length > 0) {
      const mainWindow = allWindows[0]
      mainWindow.flashFrame(true)
      return () => {
        mainWindow.flashFrame(false)
      }
    } else {
      return () => {
        console.log('dockBounce not support without window')
      }
    }
  } else {
    return () => {
      console.log('dockBounce not support on this platform')
    }
  }
}
//设置进度条
function setDockProgressBar(value: number): void {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length > 0) {
    const mainWindow = allWindows[0]
    mainWindow.setProgressBar(value)
  }
}

//设置标记
function setDockBadge(text: string): void {
  if (process.platform === 'darwin') {
     // macOS
     app.dock?.setBadge(text)
  } else if (process.platform === 'win32') {
    // Windows
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length > 0) {
      const mainWindow = allWindows[0]
      mainWindow.setOverlayIcon(null, text)
    }
  }
}

export { init_dock, dockBounce, setDockProgressBar, setDockBadge }
