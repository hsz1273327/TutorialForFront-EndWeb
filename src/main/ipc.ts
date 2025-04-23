import { app, ipcMain } from 'electron'

function 
ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender

  })