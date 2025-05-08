import { app, ipcMain, IpcMainEvent, BrowserWindow } from 'electron'

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

    // if (win) {
    //   win.webContents.send('nowtime', new Date().toLocaleString())
    // }
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
}

export { init_ipc }
