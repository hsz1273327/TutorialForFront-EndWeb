import { MenuItemConstructorOptions, shell, BrowserWindow, Menu } from 'electron'
import { saveFileWithDialog, getUint8ArrayContent } from './file_operate'

async function saveAs(window: BrowserWindow, src: string): Promise<void> {
  const fileinfo = await getUint8ArrayContent(src)
  await saveFileWithDialog(window, fileinfo)
}

// 默认的右键菜单
const DefaultTemplate = (window: BrowserWindow): MenuItemConstructorOptions[] => {
  console.log(window)
  return [
    {
      label: '功能1',
      type: 'normal',
      click: (): void => {
        console.log('功能1')
      }
    }
  ] as MenuItemConstructorOptions[]
}
// 选中的是链接的右键菜单
const AnchorTemplateFactory = (
  window: BrowserWindow,
  src: string
): MenuItemConstructorOptions[] => {
  console.log(window)
  const template = [
    { label: '复制', role: 'copy' },
    {
      label: '浏览器打开',
      type: 'normal',
      click: (): void => {
        shell.openExternal(src)
      }
    }
  ] as MenuItemConstructorOptions[]
  return template
}

// 选中的是文本的右键菜单
const TextTemplateFactory = (window: BrowserWindow, src: string): MenuItemConstructorOptions[] => {
  console.log(window)
  console.log('TextTemplateFactory', src)
  return [{ label: '复制', role: 'copy' }] as MenuItemConstructorOptions[]
}
// 选中的是图片的右键菜单
const ImageTemplateFactory = (window: BrowserWindow, src: string): MenuItemConstructorOptions[] => {
  return [
    { label: '复制', role: 'copy' },
    {
      label: '保存',
      type: 'normal',
      click: async (): Promise<void> => await saveAs(window, src)
    }
  ] as MenuItemConstructorOptions[]
}
// 选中的是视频的右键菜单
const VideoTemplateFactory = (window: BrowserWindow, src: string): MenuItemConstructorOptions[] => {
  return [
    {
      label: '保存',
      type: 'normal',
      click: async (): Promise<void> => await saveAs(window, src)
    }
  ] as MenuItemConstructorOptions[]
}

// 选中的是输入框的右键菜单
const InputTemplateFactory = (
  window: BrowserWindow,
  src?: string
): MenuItemConstructorOptions[] => {
  console.log(window)
  console.log('InputTemplateFactory', src)
  return [{ label: '黏贴', role: 'paste' }] as MenuItemConstructorOptions[]
}

function ContentMenuFactory(
  window: BrowserWindow,
  place?: string,
  target?: string,
  callback?: () => void
): void {
  let template = DefaultTemplate(window)
  switch (place) {
    case 'anchor':
      {
        if (!target) {
          console.error('target is null')
          throw new Error('target is null')
        }
        template = AnchorTemplateFactory(window, target)
      }
      break
    case 'text':
      {
        if (!target) {
          console.error('target is null')
          throw new Error('target is null')
        }
        template = TextTemplateFactory(window, target)
      }
      break
    case 'image':
      {
        if (!target) {
          console.error('target is null')
          throw new Error('target is null')
        }
        template = ImageTemplateFactory(window, target)
      }
      break
    case 'video':
      {
        if (!target) {
          console.error('target is null')
          throw new Error('target is null')
        }
        template = VideoTemplateFactory(window, target)
      }
      break
    case 'input':
      {
        template = InputTemplateFactory(window, target)
      }
      break
    default:
      template = DefaultTemplate(window)
      break
  }
  console.log('右键菜单:', template)
  const menu = Menu.buildFromTemplate(template)
  menu.popup({ window: window, callback: callback })
}

export { ContentMenuFactory, saveAs }
