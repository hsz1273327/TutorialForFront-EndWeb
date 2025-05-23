import { MenuItemConstructorOptions, shell, BrowserWindow, Menu } from 'electron'
import { saveFileWithDialog, supportedSuxfixToMimeType } from './file_operate'
import type { FileInfo } from '../common/file-info'

async function getUint8ArrayContent(src: string): Promise<FileInfo> {
  let mimetype
  const response = await fetch(src)
  const arrayBuffer = await response.arrayBuffer()
  const content = new Uint8Array(arrayBuffer)
  const type = response.headers.get('Content-Type')
  if (type) {
    mimetype = type
  } else {
    const url = new URL(src)
    const ext = url.pathname.split('.').pop()
    if (ext) {
      mimetype = supportedSuxfixToMimeType(ext)
    } else {
      throw new Error('无法获取文件类型')
    }
  }
  return {
    content,
    mimeType: mimetype
  }
}

async function saveAs(window, src): Promise<void> {
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
    default:
      template = DefaultTemplate(window)
      break
  }
  console.log('右键菜单:', template)
  const menu = Menu.buildFromTemplate(template)
  menu.popup({ window: window, callback: callback })
}

export { ContentMenuFactory }
