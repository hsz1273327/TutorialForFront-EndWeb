import type { Setting } from './setting'
import type { SysInfoHumanReadable } from './sysinfo'

interface RenderSetting extends Setting, SysInfoHumanReadable {}

export type { RenderSetting }
