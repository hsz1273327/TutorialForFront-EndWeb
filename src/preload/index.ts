import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // Add your custom APIs here
  // Example: getAppPath: () => electronAPI.getAppPath()
  getAppPath: (): Promise<string> => ipcRenderer.invoke('get-app-data-path'),
  getAppDataPath: (): Promise<string> => ipcRenderer.invoke('get-app-path'),
  echo: (requestData: string): Promise<string> => ipcRenderer.invoke('echo', requestData),

  //push api
  onUpdateNowTime: (callback: (value: string) => void): void => {
    ipcRenderer.on('nowtime', (_event, value: string) => callback(value))
  },

  // pull api
  pull: (message: string): void => ipcRenderer.send('pull-request', message)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
