import { Tray, nativeImage, Menu, MenuItem, MenuItemConstructorOptions } from 'electron'
import icon from '../../resources/icon.png?asset'
import { getSetting, setSetting, cleanSetting } from './setting'
import { showWindow, sendToMainWindow } from './window_operate'
import { app_soft_quit } from './app_operate'

let tray: Tray | null = null

function soft_update_tray_menu(): void {
  if (tray) {
    const contextMenu = update_tray_menu()
    tray.setContextMenu(contextMenu) // 重新设置菜单
  }
}
// let soft_update_tray_menu: (() => Promise<void>) | null = null
enum ItemChoise {
  Item1 = 'Item1',
  Item2 = 'Item2',
  Item3 = 'Item3',
  Item4 = 'Item4'
}

let itmeChoise: ItemChoise
// 处理
function handleRadioMenuClick(label: ItemChoise): void {
  console.log(`${label} clicked`)
  // 在这里处理统一的逻辑
  itmeChoise = label
  if (soft_update_tray_menu) {
    soft_update_tray_menu()
  }
}
function update_tray_menu(): Menu {
  const setting = getSetting()
  // normal
  const normalTemplates = [
    { label: '显示', type: 'normal' as const, click: (): void => showWindow() },
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
  ]
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

  const radioTemplates: MenuItemConstructorOptions[] = []
  for (const item of Object.keys(ItemChoise)) {
    const item_enum = ItemChoise[item as keyof typeof ItemChoise]
    radioTemplates.push({
      label: item,
      type: 'radio' as const,
      checked: itmeChoise === item_enum,
      click: (): void => handleRadioMenuClick(item_enum)
    })
  }

  const Templates: MenuItemConstructorOptions[] = [
    ...normalTemplates,
    { type: 'separator' },
    ...checkboxTemplates,
    { type: 'separator' },
    ...radioTemplates
  ]
  const contextMenu = Menu.buildFromTemplate(Templates)
  return contextMenu
}

// function soft_update_tray_menu_factory(tray: Tray): () => Promise<void> {
//   return async function () {
//     const contextMenu = update_tray_menu()
//     tray.setContextMenu(contextMenu) // 重新设置菜单
//   }
// }
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
}

function show_balloon(options: Electron.DisplayBalloonOptions): void {
  if (process.platform === 'win32' && tray) {
    tray.displayBalloon(options)
    return
  }
}

export { init_tray, show_balloon }
