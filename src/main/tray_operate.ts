import { Tray, nativeImage, Menu, MenuItem, MenuItemConstructorOptions } from 'electron'
import sleep from 'await-sleep'
import icon from '../../resources/icon.png?asset'
import { getSetting, setSetting, cleanSetting } from './setting'
import {
  showWindow,
  sendToMainWindow,
  updateWindowMenuType,
  shakeMainWindow
} from './window_operate'
import { app_soft_quit } from './app_operate'
import { dockBounce, setDockProgressBar } from './dock_operate'

let tray: Tray | null = null
// windows 下的托盘气泡提示
function show_balloon(options: Electron.DisplayBalloonOptions): void {
  if (process.platform === 'win32' && tray) {
    tray.displayBalloon(options)
    return
  }
}

function soft_update_tray_menu(): void {
  if (tray) {
    const contextMenu = update_tray_menu()
    tray.setContextMenu(contextMenu) // 重新设置菜单
  }
}

enum TitleBarStyleChoise {
  default = 'default',
  custom = 'custom'
}

// let titleBarStyleChoise: TitleBarStyleChoise
// 处理
function handleTitleBarStyleMenuClick(label: TitleBarStyleChoise): void {
  console.log(`${label} clicked`)
  // 在这里处理统一的逻辑
  // titleBarStyleChoise = label
  setSetting({ window_menu_type: label })
  updateWindowMenuType()
  if (soft_update_tray_menu) {
    soft_update_tray_menu()
  }
}

enum ContextMenuStyleChoise {
  default = 'default',
  custom = 'custom'
}

// let titleBarStyleChoise:ContextMenuStyleChoise
// 处理
function handleContextMenuStyleMenuClick(label: ContextMenuStyleChoise): void {
  console.log(`${label} clicked`)
  // 在这里处理统一的逻辑
  // titleBarStyleChoise = label
  setSetting({ context_menu_type: label })
  updateWindowMenuType()
  if (soft_update_tray_menu) {
    soft_update_tray_menu()
  }
}

// let badge: number = 0
function update_tray_menu(): Menu {
  const setting = getSetting()
  // normal
  let normalTemplates = [
    { label: '显示', type: 'normal' as const, click: (): void => showWindow() },
    { label: '还原设置', type: 'normal' as const, click: (): void => cleanSetting() },
    {
      label: '更新时间',
      type: 'normal' as const,
      click: (): void => sendToMainWindow('nowtime', new Date().toLocaleString())
    },
    {
      label: '窗口抖动',
      type: 'normal' as const,
      click: (): void => shakeMainWindow()
    }
  ]

  if (process.platform === 'win32' || process.platform === 'darwin') {
    normalTemplates = normalTemplates.concat([
      {
        label: 'dock抖动',
        type: 'normal' as const,
        click: (): void => {
          const cancelBounce = dockBounce()
          setTimeout(() => {
            console.log('cancelBounce...')
            cancelBounce()
          }, 2000)
        }
      },
      {
        label: 'dock进度条',
        type: 'normal' as const,
        click: async (): Promise<void> => {
          setDockProgressBar(0)
          for (let i = 0; i <= 20; i++) {
            await sleep(1000)
            const progress = i / 20
            setDockProgressBar(progress)
            console.log(`Electron progress_bar: ${progress}%`)
          }
          setDockProgressBar(-1)
        }
      }
    ])
  }
  if (process.platform === 'win32') {
    normalTemplates = normalTemplates.concat([
      {
        label: '托盘气泡',
        type: 'normal' as const,
        click: (): void => {
          show_balloon({
            title: '托盘气泡',
            content: '这是一个托盘气泡提示'
          })
        }
      }
    ])
  }
  // checkbox
  const checkboxTemplates = [
    {
      label: 'background',
      type: 'checkbox' as const,
      id: 'background',
      checked: setting.can_background,
      click: (menuItem: MenuItem): void => {
        console.log(`background is now ${menuItem.checked ? 'checked' : 'unchecked'}`)
        setSetting({ can_background: menuItem.checked })
        if (soft_update_tray_menu) {
          soft_update_tray_menu()
        }
      }
    },
    {
      label: 'hide as close',
      type: 'checkbox' as const,
      id: 'hide_as_close',
      checked: setting.window_hide_as_close,
      click: (menuItem: MenuItem): void => {
        console.log(`hide as close is now ${menuItem.checked ? 'checked' : 'unchecked'}`)
        setSetting({ window_hide_as_close: menuItem.checked })
        if (soft_update_tray_menu) {
          soft_update_tray_menu()
        }
      }
    }
  ]

  const titlebarRadioTemplates: MenuItemConstructorOptions[] = []
  for (const item of Object.keys(TitleBarStyleChoise)) {
    const item_enum = TitleBarStyleChoise[item as keyof typeof TitleBarStyleChoise]
    titlebarRadioTemplates.push({
      label: `titlebar-${item}`,
      type: 'radio' as const,
      checked: setting['window_menu_type'] === item_enum,
      click: (): void => handleTitleBarStyleMenuClick(item_enum)
    })
  }
  const contextMenuRadioTemplates: MenuItemConstructorOptions[] = []
  for (const item of Object.keys(ContextMenuStyleChoise)) {
    const item_enum = ContextMenuStyleChoise[item as keyof typeof ContextMenuStyleChoise]
    contextMenuRadioTemplates.push({
      label: `contextMenu-${item}`,
      type: 'radio' as const,
      checked: setting['context_menu_type'] === item_enum,
      click: (): void => handleContextMenuStyleMenuClick(item_enum)
    })
  }


  const Templates: MenuItemConstructorOptions[] = [
    ...normalTemplates,
    { type: 'separator' },
    ...checkboxTemplates,
    { type: 'separator' },
    ...titlebarRadioTemplates,
    { type: 'separator' },
    ...contextMenuRadioTemplates,
    { type: 'separator' },
    {
      label: '退出',
      type: 'normal' as const,
      click: (): void => {
        app_soft_quit()
      }
    }
  ]
  const contextMenu = Menu.buildFromTemplate(Templates)
  return contextMenu
}

// 系统托盘设置
function init_tray(): void {
  // macos推荐尺寸为16x16,其他的也都可以接受就直接用16x16就好
  const tray_icon = nativeImage.createFromPath(icon).resize({ width: 16, height: 16 })
  tray = new Tray(tray_icon)
  // soft_update_tray_menu = soft_update_tray_menu_factory(tray)
  const contextMenu = update_tray_menu()
  tray.setContextMenu(contextMenu)
  //设置鼠标指针在托盘图标上悬停时显示的文本(linux下不支持)
  tray.setToolTip('This is my application')
  // if (platform === 'darwin') {
  //   // macOS
  //   tray.setPressedImage(tray_icon)
  // }
}

export { init_tray, show_balloon }
