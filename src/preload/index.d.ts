import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppPath: () => Promise<string>
      getAppDataPath: () => Promise<string>
      echo: (requestData: string) => Promise<string>
      onUpdateNowTime: (callback: (value: string) => void) => void
      pull: (message: string) => void
      onUpdateMenuVisibility: (callback: (value: boolean) => void) => void
      onSetOpacity: (callback: (value: number) => void) => void
      // window-control
      windowControl: (action: string) => void
      // file-control
      openFile: () => Promise<FileInfo>
      selectFiles: () => Promise<string[]>
      saveFile: (content: string | Uint8Array, name?: string) => Promise<string>
      readFile: (file: File) => Promise<FileInfo>
    }
  }
}
