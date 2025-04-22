import { app, BrowserWindow } from 'electron'
import sleep from 'await-sleep'

async function app_soft_quit(): Promise<void> {
  await sleep(1000)
  console.log('app_soft_quit')
  const all_windows = BrowserWindow.getAllWindows()
  if (all_windows.length > 0) {
    for (const window of all_windows) {
      window.destroy() // 关闭窗口
    }
  }
  app.quit()
}

export { app_soft_quit }
