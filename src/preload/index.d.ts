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
      onUpdateRenderSetting: (callback: (setting: RenderSetting) => void) => void
      onSetOpacity: (callback: (value: number) => void) => void
      // window-control
      windowControl: (action: string) => void
      // file-control
      openFile: () => Promise<FileInfo>
      selectFiles: () => Promise<string[]>
      saveFile: (content: string | Uint8Array, name?: string) => Promise<string>
      readFile: (file: File) => Promise<FileInfo>
      dragAsFile: (src: TargetSource) => Promise<string>
       // content-menu
      openContentMenu: (
        place?: 'anchor' | 'text' | 'image' | 'video',
        target?: string
      ) => Promise<void>
    }
  }
}
