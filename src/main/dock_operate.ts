import { app, Menu } from 'electron'
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

export { init_dock }
