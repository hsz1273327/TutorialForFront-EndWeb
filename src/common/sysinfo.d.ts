interface FSInfo {
  total: number
  free: number
  used: number
  mount: string
}
interface FSInfoHumanReadable {
  total: string
  free: string
  used: string
  mount: string
}

interface CpuInfo {
  manufacturer: string
  brand: string
  cores: number
  speed: number
}
interface GpuInfo {
  vendor: string
  model: string
  vram: number | null
}
interface GpuInfoHumanReadable {
  vendor: string
  model: string
  vram: string | null
}
interface SysInfoBase {
  platform: '' | 'darwin' | 'win32' | 'linux' | 'aix' | 'freebsd' | 'openbsd' | 'sunos'
  wayland: boolean
  arch: string
  hasBattery: boolean
  cpuInfo: CpuInfo
  cudaVersion?: string
  rocmVersion?: string
}
interface SysInfo extends SysInfoBase {
  memorySize: number
  fsInfo: FSInfo
  graphics?: Array<GpuInfo>
}

interface SysInfoHumanReadable extends SysInfoBase {
  memorySize: string
  fsInfo: FSInfoHumanReadable
  graphics?: Array<GpuInfoHumanReadable>
}
export { FSInfo, FSInfoHumanReadable, GpuInfo, GpuInfoHumanReadable, SysInfo, SysInfoHumanReadable }
