import { app, dialog } from 'electron'
import { homedir } from 'os'
import { join } from 'path'
import { promises as fs } from 'fs'
import { existsSync } from 'fs'
const home_path = homedir()
const appName = app.getName()
const appVersion = app.getVersion()
const target_desktop_path = join(home_path, `.local/share/applications/${appName}.desktop`)
const target_icon_path = join(home_path, `.local/share/icons/${appName}.png`)
const appDir = process.env.APPDIR

async function init_linux(): Promise<void> {
  if (appDir) {
    if (!existsSync(target_desktop_path)) {
      // 当为appimage程序且不存在.desktop时让用户选择是否进行集成
      const userResponse = await dialog.showMessageBox({
        type: 'question',
        buttons: ['是', '否'],
        defaultId: 0,
        title: '系统集成',
        message: '是否将应用程序集成到系统中?(添加到应用菜单)'
      })
      if (userResponse.response === 0) {
        installDesktopFile()
      }
    } else {
      // 如果已经存在.desktop文件,判断其内容是否一致
      const source_content = await getSourceDesktopFileContent()
      const target_content = await fs.readFile(target_desktop_path, 'utf-8')
      if (source_content !== target_content) {
        // 如果内容不一致,提示用户是否覆盖
        const userResponse = await dialog.showMessageBox({
          type: 'question',
          buttons: ['是', '否'],
          defaultId: 0,
          title: '系统集成',
          message: '是否更新应用程序的集成集成配置?(更新应用菜单)'
        })
        if (userResponse.response === 0) {
          installDesktopFile()
        }
      }
    }
  }
}

async function getSourceDesktopFileContent(): Promise<string> {
  const source_dir = appDir as string
  const appimage_dir = process.cwd()
  const source_desktop_path = join(source_dir, `${appName}.desktop`)
  let result = await fs.readFile(source_desktop_path, 'utf-8')
  // 替换Exec
  result = result.replace(/Exec=AppRun/g, `Exec=${appimage_dir}/${appName}-${appVersion}.AppImage`)
  // 替换Icon
  result = result.replace(`Icon=${appName}`, `Icon=${target_icon_path}`)
  return result
}

async function installDesktopFile(): Promise<void> {
  try {
    const result = await getSourceDesktopFileContent()
    await fs.writeFile(target_desktop_path, result)
    console.log(`.desktop 文件已部署到: ${target_desktop_path}`)
    const source_icon_path = join(appDir as string, `${appName}.png`)
    // 复制图标文件
    await fs.copyFile(source_icon_path, target_icon_path)
    console.log(`图标文件已复制到: ${target_icon_path}`)

    // 提示用户安装成功
    await dialog.showMessageBox({
      type: 'info',
      buttons: ['确定'],
      defaultId: 0,
      title: '安装成功',
      message: '应用程序已成功集成到系统中！'
    })
  } catch (error) {
    console.error('安装 .desktop 文件时出错:', error)
    await dialog.showMessageBox({
      type: 'error',
      buttons: ['确定'],
      defaultId: 0,
      title: '安装失败',
      message: '应用程序集成到系统时出错，请检查日志。'
    })
  }
}

export { init_linux }
