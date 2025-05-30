interface RenderSetting {
  platform: '' | 'darwin' | 'win32' | 'linux' | 'aix' | 'freebsd' | 'openbsd' | 'sunos'
  wayland: boolean
  showTitleBar: boolean
}

export type { RenderSetting }
