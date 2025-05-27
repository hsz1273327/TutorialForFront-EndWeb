import {
  app,
  ipcMain,
  IpcMainEvent,
  IpcMainInvokeEvent,
  BrowserWindow,
  nativeImage
} from 'electron'
import {
  supportedMimeTypeToSuxfix,
  openFile,
  selectFiles,
  readFile,
  saveFileWithDialog,
  saveFile,
  getUint8ArrayContent
} from './file_operate'
import { join } from 'path'
import type { FileInfo, TargetSource } from '../common/file-info'
import icon from '../../resources/icon.png?asset'

function init_ipc(): void {
  // `Request-Reply`模式的接口
  ipcMain.handle('get-app-data-path', () => {
    return app.getPath('userData')
  })
  ipcMain.handle('get-app-path', () => {
    return app.getAppPath()
  })
  ipcMain.handle('echo', (_event, requestData: string): string => {
    console.log('收到渲染进程的请求:', requestData)
    return requestData
    // throw new Error('test error')
  })
  // `pull`接口
  ipcMain.on('pull-request', (event, data: string) => {
    const webContents = event.sender
    // const win = BrowserWindow.fromWebContents(webContents)
    console.log('收到渲染进程的请求:', data)
    // 给发消息过来的渲染进程发送消息
    if (data === 'nowtime') {
      webContents.send('nowtime', new Date().toLocaleString())
    }
  })
  // `pull`接口
  ipcMain.on('pull-request', (event, data: string) => {
    const webContents = event.sender
    // const win = BrowserWindow.fromWebContents(webContents)
    console.log('收到渲染进程的请求:', data)
    // 给发消息过来的渲染进程发送消息
    if (data === 'nowtime') {
      webContents.send('nowtime', new Date().toLocaleString())
    }
  })
  // `window-control`,让渲染进程控制窗口的最大化最小化和关闭
  ipcMain.on('window-control', (event: IpcMainEvent, action: string) => {
    // 获取发送消息的 webContents 对象
    const webContents = event.sender
    // 从 webContents 获取对应的 BrowserWindow 对象
    const Window = BrowserWindow.fromWebContents(webContents)
    if (Window) {
      switch (action) {
        case 'minimize':
          Window.minimize()
          break
        case 'maximize':
          if (Window.isMaximized()) {
            Window.unmaximize()
          } else {
            Window.maximize()
          }
          break
        case 'close':
          Window.close()
          break
      }
    }
  })
  // `file-control`,让渲染进程控制文件系统
  ipcMain.handle(
    'file-control',
    async (
      event: IpcMainInvokeEvent,
      action: string,
      filepath?: string,
      file?: FileInfo,
      src?: TargetSource
    ): Promise<FileInfo | string[] | string> => {
      // 获取发送消息的 webContents 对象
      const webContents = event.sender
      // 从 webContents 获取对应的 BrowserWindow 对象
      const Window = BrowserWindow.fromWebContents(webContents)
      if (Window) {
        switch (action) {
          case 'open-file':
            {
              const filePath = await openFile(Window)
              console.log('选中的文件路径:', filePath)
              if (filePath) {
                return filePath
              } else {
                console.error('文件路径不能为空')
                throw new Error('文件路径不能为空')
              }
            }
            break
          case 'select-files':
            {
              const filePaths = await selectFiles(Window)
              console.log('选中的文件路径:', filePaths)
              if (filePaths) {
                return filePaths
              } else {
                console.error('文件路径不能为空')
                throw new Error('文件路径不能为空')
              }
            }
            break
          case 'read-file':
            {
              if (!filepath) {
                console.error('文件路径不能为空')
                throw new Error('文件路径不能为空')
              }
              const fileinfo = await readFile(filepath)
              console.log('读取文件成功:', filepath)
              return fileinfo
            }
            break
          case 'save-file':
            {
              if (!file) {
                console.error('文件不能为空')
                throw new Error('文件内容不能为空')
              }
              if (!file.name) {
                console.error('文件名不能为空')
                throw new Error('文件名不能为空')
              }
              if (!file.content) {
                console.error('文件内容不能为空')
                throw new Error('文件内容不能为空')
              }
              const filePath = await saveFileWithDialog(Window, file)
              console.log('保存文件成功:', filePath)
              return filePath
            }
            break
          case 'drag-as-file': {
            if (!src) {
              console.error('元素源不能为空')
              throw new Error('元素源不能为空')
            }
            if (!src.source) {
              console.error('元素源的 source 不能为空')
              throw new Error('元素源的 source 不能为空')
            }
            if (!src.type) {
              console.error('元素源的 type 不能为空')
              throw new Error('元素源的 type 不能为空')
            }
            const drag_time = new Date().getTime()
            let tempfilePath: string
            switch (src.type) {
              case 'text':
                {
                  src.source = src.source.trim()
                  if (src.source.length === 0) {
                    console.error('文本内容不能为空')
                    throw new Error('文本内容不能为空')
                  }
                  tempfilePath = join(app.getPath('temp'), `new-drag-text-${drag_time}.txt`)
                  await saveFile(tempfilePath, src.source)
                }
                break
              case 'anchor':
                {
                  if (!src.source.startsWith('http://') && !src.source.startsWith('https://')) {
                    console.error('锚点链接必须以 http:// 或 https:// 开头')
                    throw new Error('锚点链接必须以 http:// 或 https:// 开头')
                  }
                  tempfilePath = join(app.getPath('temp'), `new-drag-anchor-${drag_time}.url`)
                  await saveFile(tempfilePath, src.source)
                }
                break
              case 'image':
              case 'video':
                {
                  const file = await getUint8ArrayContent(src.source)
                  if (!file) {
                    console.error('获取文件内容失败')
                    throw new Error('获取文件内容失败')
                  }
                  if (!file.mimeType) {
                    console.error('文件的 MIME 类型不能为空')
                    throw new Error('文件的 MIME 类型不能为空')
                  }
                  const suxfix = supportedMimeTypeToSuxfix(file.mimeType)
                  tempfilePath = join(app.getPath('temp'), `new-drag-file-${drag_time}${suxfix}`)
                  await saveFile(tempfilePath, file.content)
                }
                break
              default:
                {
                  console.error('未知的元素源类型:', src.type)
                  throw new Error('未知的元素源类型')
                }
                break
            }
            event.sender.startDrag({
              file: tempfilePath,
              icon: nativeImage.createFromPath(icon).resize({ width: 16, height: 16 })
            })
            console.log('开始拖拽文件:', tempfilePath)
            return tempfilePath
          }
          default:
            {
              console.error('未知的操作:', action)
              throw new Error('未知的操作')
            }
            break
        }
      } else {
        console.error('获取窗口失败')
        throw new Error('获取窗口失败')
      }
    }
  )
}

export { init_ipc }
