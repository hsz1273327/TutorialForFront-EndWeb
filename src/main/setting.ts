import { app } from 'electron'
import { join } from 'path'
import * as fs from 'fs'
import Ajv from 'ajv'

const SettingSchema = {
  type: 'object',
  properties: {
    window_limit: { type: 'integer', minimum: 0, maximum: 10 },
    can_background: { type: 'boolean' },
    window_hide_as_close: { type: 'boolean' }
  },
  additionalProperties: false
}

interface Setting {
  window_limit?: number
  can_background?: boolean
  window_hide_as_close?: boolean
}
const DEFAULT_SETTING: Setting = {
  window_limit: 1, // 窗口数量限制,<=0表示不限制
  can_background: false,
  window_hide_as_close: false
}

function getSetting(): Setting {
  const setting_path = join(app.getPath('userData'), 'setting.json')
  // 检查文件是否存在
  if (fs.existsSync(setting_path)) {
    // 文件存在，读取文件内容
    const data = fs.readFileSync(setting_path, 'utf-8')
    const custom_setting = JSON.parse(data)
    const ajv = new Ajv()
    const validate = ajv.compile(SettingSchema)
    const valid = validate(custom_setting)
    if (!valid) {
      console.error('Invalid setting file, using default settings:', validate.errors)
      fs.writeFileSync(setting_path, JSON.stringify(DEFAULT_SETTING))
      return DEFAULT_SETTING
    } else {
      const setting = {}
      Object.assign(setting, DEFAULT_SETTING)
      Object.assign(setting, custom_setting)
      return setting as Setting
    }
  } else {
    // 文件不存在，创建文件并写入默认值
    fs.writeFileSync(setting_path, JSON.stringify(DEFAULT_SETTING))
    console.log('File created with default settings:', DEFAULT_SETTING)
    return DEFAULT_SETTING
  }
}

function setSetting(setting: Setting): void {
  const ajv = new Ajv()
  const validate = ajv.compile(SettingSchema)
  const valid = validate(setting)
  if (!valid) {
    console.error('Invalid setting file, using default settings:', validate.errors)
    throw new Error(`Invalid setting errors: ${JSON.stringify(validate.errors)}`)
  }
  const setting_path = join(app.getPath('userData'), 'setting.json')
  // 检查文件是否存在
  if (fs.existsSync(setting_path)) {
    // 文件存在，读取文件内容
    const old_data = fs.readFileSync(setting_path, 'utf-8')
    const old_custom_setting = JSON.parse(old_data)
    const old_validate = ajv.compile(SettingSchema)
    const old_valid = old_validate(old_custom_setting)
    if (!old_valid) {
      console.error('Invalid setting file, using custom settings:', validate.errors)
      fs.writeFileSync(setting_path, JSON.stringify(setting))
    } else {
      const new_setting: Setting = {}
      Object.assign(new_setting, old_custom_setting)
      Object.assign(new_setting, setting)
      fs.writeFileSync(setting_path, JSON.stringify(new_setting))
    }
  } else {
    fs.writeFileSync(setting_path, JSON.stringify(setting))
    console.log('File created with custom settings:', setting)
    return
  }
}
function cleanSetting(): void {
  const setting_path = join(app.getPath('userData'), 'setting.json')
  // 检查文件是否存在
  if (fs.existsSync(setting_path)) {
    fs.unlinkSync(setting_path)
    console.log('File deleted:', setting_path)
  } else {
    console.log('File does not exist:', setting_path)
  }
}
//   })

export { getSetting, setSetting, cleanSetting }
export type { Setting }
