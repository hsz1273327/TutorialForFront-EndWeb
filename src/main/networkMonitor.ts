// networkMonitor.ts

import * as os from 'os'
import * as https from 'https'
import { EventEmitter } from 'events'
import { net } from 'electron' // 从 Electron 导入 app 和 net 模块
import { NetworkConnectionLevel } from '../common/networkMonitor' // 导入重新定义的枚举

/**
 * NetworkMonitor 类用于封装网络状态检测逻辑。
 * 它是一个单例，提供实时获取网络状态的接口和网络变化事件。
 * 考虑了局域网、互联网以及特定网络限制（如 GFW）的影响。
 */
class NetworkMonitor extends EventEmitter {
  private static instance: NetworkMonitor
  private currentLevel: NetworkConnectionLevel
  private pollIntervalId: NodeJS.Timeout | null = null
  private readonly pollInterval: number = 5000 // 轮询间隔，默认为 5 秒

  private constructor() {
    super()
    this.currentLevel = NetworkConnectionLevel.NoConnection // 初始状态
  }

  public static getInstance(): NetworkMonitor {
    if (!NetworkMonitor.instance) {
      NetworkMonitor.instance = new NetworkMonitor()
    }
    return NetworkMonitor.instance
  }

  /**
   * 启动网络状态轮询。
   * 同时监听 Electron app 模块的 online/offline 事件。
   */
  public startPolling(): void {
    if (this.pollIntervalId === null) {
      // 立即执行一次检测
      this.pollNetworkStatus()
      // 设置定时器进行周期性检测
      this.pollIntervalId = setInterval(() => this.pollNetworkStatus(), this.pollInterval)
    }
  }

  /**
   * 停止网络状态轮询。
   * 同时移除 Electron app 模块的 online/offline 事件监听器。
   */
  public stopPolling(): void {
    if (this.pollIntervalId !== null) {
      clearInterval(this.pollIntervalId)
      this.pollIntervalId = null
    }
  }

  /**
   * 实时获取当前的网络连接级别。
   * @returns {NetworkConnectionLevel} 当前的网络连接级别。
   */
  public getCurrentConnectionLevel(): NetworkConnectionLevel {
    return this.currentLevel
  }

  /**
   * 内部方法：执行网络状态检测，并将结果映射到 NetworkConnectionLevel，然后根据变化触发事件。
   */
  private async pollNetworkStatus(): Promise<void> {
    const isLocal = this.isPhysicalLocalNetworkConnected()
    const isInternet = await this.canAccessInternet()
    const canAccessRestrictedServices = await this.canAccessGFWBlockedNetwork() // 新增的 GFW 检测结果

    let newLevel: NetworkConnectionLevel

    if (isInternet) {
      if (canAccessRestrictedServices) {
        newLevel = NetworkConnectionLevel.InternetFullAccess
      } else {
        newLevel = NetworkConnectionLevel.InternetRestricted
      }
    } else if (isLocal) {
      newLevel = NetworkConnectionLevel.LocalNetworkOnly
    } else {
      newLevel = NetworkConnectionLevel.NoConnection
    }

    if (newLevel !== this.currentLevel) {
      this.currentLevel = newLevel
      // 触发 'network-level-changed' 事件，并传递新的级别
      this.emit('network-level-changed', this.currentLevel)
      console.log('网络连接级别变化:', this.currentLevel)
    }
  }

  /**
   * 1. 检测物理/真实局域网连接状态。
   * @returns {boolean} 如果检测到非虚拟的、活动的网络接口，则返回 true。
   */
  private isPhysicalLocalNetworkConnected(): boolean {
    const interfaces = os.networkInterfaces()
    const ignoredInterfaces = [
      /docker/,
      /veth/,
      /br-/,
      /VMnet/,
      /VirtualBox/,
      /wsl/,
      /Loopback/ //tuntap/, /utun/
    ]

    for (const name in interfaces) {
      const shouldIgnore = ignoredInterfaces.some((regex) => regex.test(name))
      if (shouldIgnore) {
        continue
      }

      const ifaceList = interfaces[name]
      if (!ifaceList) {
        continue
      }
      for (const iface of ifaceList) {
        if (iface.family === 'IPv4' && !iface.internal) {
          if (
            iface.address.startsWith('172.17.') ||
            iface.address.startsWith('172.18.') ||
            iface.address.startsWith('172.19.') ||
            iface.address.startsWith('169.254.')
          ) {
            continue
          }
          return true
        }
      }
    }
    return false
  }

  /**
   * 2. 检测是否可以访问互联网。
   * @returns {Promise<boolean>} 如果可以访问互联网，则返回 true。
   */
  private async canAccessInternet(
    testUrl: string = 'https://www.baidu.com',
    timeout: number = 5000
  ): Promise<boolean> {
    // Electron 的 net.online 是一个属性，直接访问即可。
    // 它反映 Chromium 内部对网络状态的判断，比单纯的 HTTP 请求更快但可能不够精确。
    if (!net.online) {
      return false
    }

    try {
      // 使用 Electron 的 `net.fetch` (基于 Chromium 网络栈)
      const res = await net.fetch(testUrl, { method: 'HEAD', signal: AbortSignal.timeout(timeout) })
      return res.ok
    } catch {
      // console.error(`互联网访问测试失败 (${testUrl}):`, error);
      return false
    }
  }

  /**
   * 3. 检测是否可以访问被 GFW 阻断的特定服务（例如 Google API）。
   * @param {string} blockedUrl 已知被 GFW 阻断的 URL (例如 Google 的测试页面)。
   * @param {number} timeout 请求超时时间（毫秒）。
   * @returns {Promise<boolean>} 如果可以访问被阻断的服务，则返回 true。
   */
  private async canAccessGFWBlockedNetwork(
    blockedUrl: string = 'https://www.google.com',
    timeout: number = 5000
  ): Promise<boolean> {
    return new Promise((resolve) => {
      // 使用 Node.js 的 https 模块，因为它会遵循系统的代理设置
      const req = https.request(blockedUrl, { method: 'HEAD', timeout: timeout }, (res) => {
        res.resume() // 消耗响应数据，防止内存泄漏
        resolve(res.statusCode! >= 200 && res.statusCode! < 400)
      })

      req.on('error', () => resolve(false))
      req.on('timeout', () => {
        req.destroy()
        resolve(false)
      })
      req.end()
    })
  }
}

export const networkMonitor = NetworkMonitor.getInstance()
