import { dialog, BrowserWindow } from 'electron'
import { promises as fs } from 'fs'
import path from 'path'
import type { FileInfo } from '../common/file-info'
// 简单的扩展名到 mimeType 映射
const mimeTypeMap: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.bmp': 'image/bmp',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.json': 'application/json',
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.csv': 'text/csv',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf'
  // 可根据需要继续扩展
}

// readFile 读取文件
// 读取文件内容并返回
async function readFile(filePath: string): Promise<FileInfo> {
  console.log('readFile', filePath)
  const name = path.basename(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.ico', '.svg']
  let content: string | Uint8Array
  if (imageExts.includes(ext)) {
    const buffer = await fs.readFile(filePath)
    content = new Uint8Array(buffer)
  } else {
    content = await fs.readFile(filePath, 'utf-8')
  }
  const mimeType = mimeTypeMap[ext] || 'application/octet-stream'
  return { name, content, mimeType }
}
// openFile 文件系统打开文件
// 打开文件选择对话框，返回选中的文件内容
async function openFile(window: BrowserWindow): Promise<FileInfo | null> {
  const result = await dialog.showOpenDialog(window, {
    title: '打开文件',
    properties: ['openFile']
  })
  if (!result.canceled && result.filePaths.length > 0) {
    for (const filePath of result.filePaths) {
      console.log('filePath', filePath)
      // 读取文件
    }
    const filePath = result.filePaths[0]
    const content = await readFile(filePath)
    return content
  }
  return null
}
// selectFile 选取文件
async function selectFiles(window: BrowserWindow): Promise<string[] | null> {
  const result = await dialog.showOpenDialog(window, {
    title: '选择文件',
    properties: ['openFile', 'multiSelections']
  })
  if (!result.canceled && result.filePaths.length > 0) {
    for (const filePath of result.filePaths) {
      console.log('filePath', filePath)
      // 这里可以根据需要处理文件
    }
    return result.filePaths // 返回选中的文件路径
  }
  return null
}

// openDirectory打开文件夹
async function openDirectory(window: BrowserWindow): Promise<string | null> {
  const result = await dialog.showOpenDialog(window, {
    title: '选择文件夹',
    properties: ['openDirectory', 'createDirectory', 'promptToCreate']
  })
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0] // 返回选中的文件路径
  }
  return null
}

async function saveFile(window: BrowserWindow, file: FileInfo): Promise<void> {
  const dir_path = await openDirectory(window)
  if (dir_path) {
    const filePath = `${dir_path}/${file.name}`
    console.log('saveFile', filePath)
    if (typeof file.content === 'string') {
      await fs.writeFile(filePath, file.content, 'utf-8')
      console.log('File saved successfully:', filePath)
    } else if (file.content instanceof Uint8Array) {
      await fs.writeFile(filePath, file.content)
    } else {
      throw new Error('content 必须是 string 或 Uint8Array')
    }
    console.log('File saved successfully:', filePath)
  } else {
    console.log('No directory selected')
  }
}

export { readFile, openFile, selectFiles, saveFile, openDirectory }
