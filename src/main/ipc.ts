import { app, ipcMain } from 'electron'

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
}

export { init_ipc }
