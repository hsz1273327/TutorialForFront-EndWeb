import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { FileInfo, TargetSource } from '../common/file-info'
import type { RenderSetting } from '../common/render-setting'

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
  onUpdateRenderSetting: (callback: (setting: RenderSetting) => void): void => {
    ipcRenderer.on('update-render-setting', (_event, setting: RenderSetting) => callback(setting))
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
  },
  dragAsFile: (src: TargetSource): Promise<string> => {
    return ipcRenderer.invoke('file-control', 'drag-as-file', null, null, src)
  },
  // content-menu
  openContentMenu: (
    place?: 'anchor' | 'text' | 'image' | 'video',
    target?: string
  ): Promise<void> => {
    return ipcRenderer.invoke('context-menu', place, target)
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
