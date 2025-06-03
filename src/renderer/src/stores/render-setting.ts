import { defineStore } from 'pinia'
import { RenderSetting } from '../../../common/render-setting'

export const useRenderSetting = defineStore('renderSetting', {
  state: (): RenderSetting => ({
    platform: '',
    wayland: true,
    showTitleBar: false,
    customContextMenu: false
  }),
  getters: {
    isMacOS: (state): boolean => state.platform === 'darwin',
    isWindows: (state): boolean => state.platform === 'win32',
    isLinux: (state): boolean => state.platform === 'linux',
    isWayland: (state): boolean => {
      return state.platform === 'linux' && state.wayland
    }
  },
  actions: {
    updateRenderSetting(setting: RenderSetting): void {
      this.platform = setting.platform
      this.wayland = setting.wayland
      this.showTitleBar = setting.showTitleBar
      this.customContextMenu = setting.customContextMenu
    }
  }
})
