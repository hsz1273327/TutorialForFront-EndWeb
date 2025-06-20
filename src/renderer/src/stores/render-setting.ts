import { defineStore } from 'pinia'
import { RenderSetting } from '../../../common/render-setting'

export const useRenderSetting = defineStore('renderSetting', {
  state: (): RenderSetting => ({
    can_background: false,
    window_hide_as_close: false,
    window_menu_type: 'default',
    context_menu_type: 'default',
    platform: '',
    wayland: false,
    arch: '',
    timeZone: '',
    systemLanguage: '',
    hasBattery: false,
    cpuInfo: {
      manufacturer: '',
      brand: '',
      cores: 0,
      speed: 0
    },
    memorySize: '',
    fsInfo: {
      total: '',
      free: '',
      used: '',
      mount: ''
    },
    cudaVersion: '',
    rocmVersion: '',
    graphics: []
  }),
  getters: {
    isMacOS: (state): boolean => state.platform === 'darwin',
    isWindows: (state): boolean => state.platform === 'win32',
    isLinux: (state): boolean => state.platform === 'linux',
    isWayland: (state): boolean => {
      return state.platform === 'linux' && state.wayland
    },
    showTitleBar: (state): boolean => state.window_menu_type === 'custom',
    customContextMenu: (state): boolean => state.context_menu_type === 'custom'
  },
  actions: {
    updateRenderSetting(setting: RenderSetting): void {
      this.can_background = setting.can_background
      this.window_hide_as_close = setting.window_hide_as_close
      this.window_menu_type = setting.window_menu_type
      this.context_menu_type = setting.context_menu_type
      this.platform = setting.platform
      this.wayland = setting.wayland
      this.arch = setting.arch
      this.timeZone = setting.timeZone
      this.systemLanguage = setting.systemLanguage
      this.hasBattery = setting.hasBattery
      this.cpuInfo = setting.cpuInfo
      this.memorySize = setting.memorySize
      this.fsInfo = setting.fsInfo
      if (setting.cudaVersion) {
        this.cudaVersion = setting.cudaVersion
      }
      if (setting.rocmVersion) {
        this.rocmVersion = setting.rocmVersion
      }
      if (setting.graphics) {
        this.graphics = setting.graphics
      }
    }
  }
})
