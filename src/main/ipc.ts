import { app, ipcMain } from 'electron'

function init_ipc() {
  // Handle the 'get-app-path' event
  ipcMain.handle('get-app-path', () => {
    return app.getAppPath()
  })

  // Handle the 'set-title' event
ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender

  })