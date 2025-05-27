interface FileInfo {
  name?: string
  content: string | Uint8Array
  mimeType?: string
}

interface TargetSource {
  type: 'image' | 'video' | 'anchor' | 'text'
  source?: string
}

interface RenderSetting {
  platform: '' | 'darwin' | 'win32' | 'linux' | 'aix' | 'freebsd' | 'openbsd' | 'sunos'
  wayland: boolean
  showTitleBar: boolean
}

export type { FileInfo, TargetSource, RenderSetting }
