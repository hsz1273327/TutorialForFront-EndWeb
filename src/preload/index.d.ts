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
      windowControl: (action: string) => void
      onUpdateMenuVisibility: (callback: (value: boolean) => void) => void
    }
  }
}
