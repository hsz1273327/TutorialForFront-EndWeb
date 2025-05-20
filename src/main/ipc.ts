import { app, ipcMain, IpcMainEvent, IpcMainInvokeEvent, BrowserWindow } from 'electron'
import { openFile, selectFiles, readFile, saveFile } from './file_operate'
import type { FileInfo } from '../common/file-info'
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
  ipcMain.on('window-control', (event: IpcMainEvent, action) => {
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
      file?: FileInfo
    ): Promise<FileInfo | string[] | null> => {
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
                console.error('文件内容不能为空')
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
              await saveFile(Window, file)
              console.log('保存文件成功:', file.name)
              return null
            }
            break
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
