import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { FileInfo } from '../common/file-info'
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
  pull: (message: string): void => ipcRenderer.send('pull-request', message),
  //window-control
  windowControl: (action: string): void => {
    ipcRenderer.send('window-control', action)
  },
  // update menu visibility
  onUpdateMenuVisibility: (callback: (value: boolean) => void): void => {
    ipcRenderer.on('update-menu-visibility', (_event, value: boolean) => callback(value))
  },
  onSetOpacity: (callback: (value: number) => void): void => {
    ipcRenderer.on('set-opacity', (_event, value: number) => callback(value))
  },
  // file-control
  openFile: (): Promise<FileInfo> => ipcRenderer.invoke('file-control', 'open-file'),
  selectFiles: (): Promise<string[]> => ipcRenderer.invoke('file-control', 'select-files'),
  readFile: (file: File): Promise<FileInfo> => {
    const path = webUtils.getPathForFile(file)
    console.log('readFile', path)
    return ipcRenderer.invoke('file-control', 'read-file', path)
  },
  saveFile: (content: string | Uint8Array, name?: string): Promise<string> => {
    return ipcRenderer.invoke('file-control', 'save-file', null, { name, content })
  }
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
