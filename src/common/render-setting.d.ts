interface RenderSetting {
  platform: '' | 'darwin' | 'win32' | 'linux' | 'aix' | 'freebsd' | 'openbsd' | 'sunos'
  wayland: boolean
  showTitleBar: boolean
  customContextMenu: boolean
}

export type { RenderSetting }
