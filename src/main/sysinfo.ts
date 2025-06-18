import si from 'systeminformation'
import path from 'path'
import { app } from 'electron'
import { exec } from 'child_process'
import type {
  FSInfo,
  FSInfoHumanReadable,
  GpuInfo,
  GpuInfoHumanReadable,
  SysInfo,
  SysInfoHumanReadable
} from '../common/sysinfo'

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'K', 'M', 'G', 'T', 'P']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  // 保留两位小数
  return `${value.toFixed(2)} ${sizes[i]}`
}

async function getDiskInfoByPath(targetPath: string): Promise<FSInfo> {
  const absPath = path.resolve(targetPath)
  const fsList = await si.fsSize()
  let mount: string = ''
  // 优先用 mount 字段匹配（Linux/macOS），Windows 下用 fs 字段（如 C:）
  // 先按挂载点长度倒序，确保更深的挂载点优先匹配
  const sortedFsList = fsList.sort((a, b) => (b.mount?.length || 0) - (a.mount?.length || 0))

  let disk = sortedFsList.find((item) => absPath.startsWith(item.mount))
  // Windows 下可能需要用 fs 字段（如 C:）
  if (!disk && process.platform === 'win32') {
    const driveLetter = absPath.slice(0, 2).toUpperCase() // 如 C:
    disk = fsList.find((item) => item.fs.toUpperCase().startsWith(driveLetter))
    mount = driveLetter
  } else {
    if (disk) {
      mount = disk?.mount
    }
  }

  if (disk) {
    return {
      total: disk.size, // 字节
      free: disk.available, // 字节
      used: disk.used, // 字节
      mount: mount
    }
  } else {
    throw new Error('未找到对应分区')
  }
}

function checkCudaInstalled(): Promise<{ installed: boolean; version?: string }> {
  return new Promise((resolve) => {
    exec('nvcc --version', (error, stdout) => {
      if (error) {
        resolve({ installed: false })
      } else {
        // 解析版本号
        const match = stdout.match(/release\s+([\d.]+)/)
        resolve({ installed: true, version: match ? match[1] : undefined })
      }
    })
  })
}

function checkRocmInstalled(): Promise<{ installed: boolean; version?: string }> {
  return new Promise((resolve) => {
    exec('rocminfo', (error, stdout) => {
      if (error) {
        resolve({ installed: false })
      } else {
        // 尝试从输出中解析 ROCm 版本
        // 有些系统会有 "ROCm version: x.y.z" 或 "HSA Runtime Version: x.y.z"
        const match =
          stdout.match(/ROCm\s+version:\s*([\d.]+)/i) ||
          stdout.match(/HSA\s+Runtime\s+Version:\s*([\d.]+)/i)
        resolve({ installed: true, version: match ? match[1] : undefined })
      }
    })
  })
}

let _sysInfo: SysInfo | null = null

async function init_sysinfo(): Promise<void> {
  let wayland = false
  if (process.platform === 'linux') {
    if (process.env.XDG_SESSION_TYPE === 'wayland') {
      wayland = true // 检测是否在 Wayland 会话中
    }
  }
  let sysInfo = {
    platform: process.platform,
    wayland: wayland,
    arch: process.arch
  }
  const batteryinfo = await si.battery()
  sysInfo = Object.assign(sysInfo, { hasBattery: batteryinfo.hasBattery })

  const cpuinfo = await si.cpu()
  sysInfo = Object.assign(sysInfo, {
    cpuInfo: {
      manufacturer: cpuinfo.manufacturer,
      brand: cpuinfo.brand,
      cores: cpuinfo.cores,
      speed: cpuinfo.speed
    }
  })
  const memoinfo = await si.mem()
  sysInfo = Object.assign(sysInfo, { memorySize: memoinfo.total })

  const userDataPath = app.getPath('userData')
  const fsinfo = await getDiskInfoByPath(userDataPath)
  sysInfo = Object.assign(sysInfo, { fsInfo: fsinfo })
  const gpuinfos = await si.graphics()
  const gpuInfos: Array<GpuInfo> = []
  for (const gpuinfo of gpuinfos.controllers) {
    gpuInfos.push({
      vendor: gpuinfo.vendor,
      model: gpuinfo.model,
      vram: gpuinfo.vram
    })
  }
  if (gpuInfos.length > 0) {
    sysInfo = Object.assign(sysInfo, { graphics: gpuInfos })
  }
  const cudainfo = await checkCudaInstalled()
  if (cudainfo.installed) {
    sysInfo = Object.assign(sysInfo, { cudaVersion: cudainfo.version })
  }
  const rocminfo = await checkRocmInstalled()
  if (rocminfo.installed) {
    sysInfo = Object.assign(sysInfo, { rocmVersion: rocminfo.version })
  }
  _sysInfo = sysInfo as SysInfo
}

function getSysInfo(): SysInfo {
  if (_sysInfo === null) {
    throw Error('need to run init sysinfo first')
  }
  return _sysInfo
}

function getSysInfoHumanReadable(): SysInfoHumanReadable {
  const info = getSysInfo()
  const fsInfo: FSInfoHumanReadable = {
    total: formatBytes(info.fsInfo.total),
    free: formatBytes(info.fsInfo.free),
    used: formatBytes(info.fsInfo.used),
    mount: info.fsInfo.mount
  }
  let sysInfo: SysInfoHumanReadable = {
    platform: info.platform,
    wayland: info.wayland,
    arch: info.arch,
    hasBattery: info.hasBattery,
    cpuInfo: info.cpuInfo,
    memorySize: formatBytes(info.memorySize),
    fsInfo: fsInfo
  }
  if (info.cudaVersion) {
    sysInfo = Object.assign(sysInfo, { cudaVersion: info.cudaVersion })
  }
  if (info.rocmVersion) {
    sysInfo = Object.assign(sysInfo, { rocmVersionn: info.rocmVersion })
  }
  if (info.graphics) {
    const graphics: Array<GpuInfoHumanReadable> = []
    for (const graphic of info.graphics) {
      graphics.push({
        vendor: graphic.vendor,
        model: graphic.model,
        vram: graphic.vram === null ? null : formatBytes(graphic.vram)
      })
    }
    sysInfo = Object.assign(sysInfo, { graphics: graphics })
  }
  return sysInfo
}

export { init_sysinfo, getSysInfo, getSysInfoHumanReadable, formatBytes }
