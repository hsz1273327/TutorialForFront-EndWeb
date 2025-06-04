import { dialog, BrowserWindow } from 'electron'
import { promises as fs } from 'fs'
import path from 'path'
import type { FileInfo } from '../common/file-info'
// 简单的扩展名到 mimeType 映射
const SupportedMimeTypeMap: Record<string, string> = {
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
  '.jsonl': 'application/jsonl',
  '.parquet': 'application/parquet',
  '.mp4': 'video/mp4',
  '.avi': 'video/x-msvideo',
  '.mkv': 'video/x-matroska',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.flac': 'audio/flac',
  '.aac': 'audio/aac',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/opus',
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.css': 'text/css',
  '.csv': 'text/csv',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf'
  // 可根据需要继续扩展
}
const supportedSuxfixToMimeType = (suxfix: string): string => {
  const mimetype = SupportedMimeTypeMap[suxfix]
  if (mimetype) {
    return mimetype
  }
  throw new Error(`Unsupported suxfix: ${suxfix}`)
}
// 将 mimeType 转换为扩展名
const supportedMimeTypeToSuxfix = (mimetype: string): string => {
  const suxf = Object.keys(SupportedMimeTypeMap).find(
    (key) => SupportedMimeTypeMap[key] === mimetype
  )
  if (suxf) {
    return suxf
  }
  throw new Error(`Unsupported mimeType: ${mimetype}`)
}

// readFile 读取文件
// 读取文件内容并返回
async function readFile(filePath: string): Promise<FileInfo> {
  console.log('readFile', filePath)
  const name = path.basename(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mimeType = supportedSuxfixToMimeType(ext)
  const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.ico', '.svg']
  let content: string | Uint8Array
  if (imageExts.includes(ext)) {
    const buffer = await fs.readFile(filePath)
    content = new Uint8Array(buffer)
  } else {
    content = await fs.readFile(filePath, 'utf-8')
  }
  return { name, content, mimeType }
}

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

async function saveFile(filePath: string, content: string | Uint8Array): Promise<void> {
  console.log('saveFile', filePath)
  if (typeof content === 'string') {
    await fs.writeFile(filePath, content, 'utf-8')
    await fs.chmod(filePath, 0o644) // 设置文件权限为644
  } else if (content instanceof Uint8Array) {
    await fs.writeFile(filePath, content)
    await fs.chmod(filePath, 0o644) // 设置文件权限为644
  } else {
    throw new Error('content 必须是 string 或 Uint8Array')
  }
  console.log('File saved successfully:', filePath)
}

async function saveFileWithDialog(window: BrowserWindow, file: FileInfo): Promise<string> {
  if (file.name) {
    const dir_path = await openDirectory(window)
    if (dir_path) {
      const filePath = path.join(dir_path, file.name)
      console.log('saveFileWithDialog', filePath)
      await saveFile(filePath, file.content)
      console.log('文件保存成功:', filePath)
      return filePath
    } else {
      console.error('文件夹路径不能为空')
      throw new Error('文件夹路径不能为空')
    }
  } else {
    let ext = '.txt'
    if (file.mimeType) {
      try {
        ext = supportedMimeTypeToSuxfix(file.mimeType)
      } catch (error) {
        console.error(`文件类型不支持,${error}`)
      }
    }
    const result = await dialog.showSaveDialog(window, {
      title: '保存文件',
      defaultPath: `未命名${ext}`, // 默认文件名
      filters: [
        { name: '文本文件', extensions: ['txt', 'md'] },
        { name: '数据文件', extensions: ['json', 'csv', 'jsonl', 'parquet'] },
        { name: '图片文件', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'] },
        { name: '视频文件', extensions: ['mp4', 'avi', 'mkv', 'webm'] },
        { name: '音频文件', extensions: ['mp3', 'wav', 'flac', 'aac'] },
        { name: '所有文件', extensions: ['*'] }
      ]
    })
    if (!result.canceled && result.filePath) {
      console.log('saveFileWithDialog', result.filePath)
      await saveFile(result.filePath, file.content)
      console.log('文件保存成功:', result.filePath)
      return result.filePath
    } else {
      console.error('文件路径不能为空')
      throw new Error('文件路径不能为空')
    }
  }
}
function isHttpURL(str: string): boolean {
  if (typeof str !== 'string' || str.trim() === '') {
    throw new Error('输入必须是一个非空字符串')
  }

  // 尝试创建一个 URL 对象。
  // 如果字符串不是一个合法的URL，URL 构造函数会抛出一个 TypeError。
  const url = new URL(str)
  // 只接受 http 和 https 协议的 URL
  if (url.protocol === 'http:' || url.protocol === 'https:') {
    return true
  } else if (url.protocol === 'file:') {
    return false
  } else {
    throw new Error('输入的字符串不是一个有效的 URL')
  }
}
// 从src中获取文件Uint8Array内容
async function getUint8ArrayContent(src: string): Promise<FileInfo> {
  let mimetype
  if (!isHttpURL(src)) {
    // 如果不是有效的 URL，直接读取本地文件
    // const filePath = path.resolve(src)
    let filePath = src
    if (process.platform === 'win32') {
      if (src.startsWith('file:///')) {
        filePath = src.replace(/^file:\/\/\//, '')
      } else if (src.startsWith('file://')) {
        filePath = src.replace(/^file:\/\//, '')
      }
    } else {
      if (src.startsWith('file://')) {
        filePath = src.replace(/^file:\/\//, '')
      }
    }
    const ext = path.extname(filePath).toLowerCase()
    mimetype = supportedSuxfixToMimeType(ext)
    try {
      console.log('getUint8ArrayContent', filePath, mimetype, ext)
      const content = await fs.readFile(filePath)
      return {
        content: new Uint8Array(content),
        mimeType: mimetype
      }
    } catch (error) {
      console.error(`读取本地文件失败: ${error}`)
      const f = filePath.slice(0, 15)
      throw new Error(`filePath: ${f}`)
    }
  } else {
    const response = await fetch(src)
    const mimetype = response.headers.get('Content-Type')
    if (!mimetype) {
      throw new Error('无法获取文件的 MIME 类型')
    }
    if (mimetype == 'image/svg+xml') {
      // 特殊处理 SVG 文件
      const svgContent = await response.text()
      return {
        content: svgContent,
        mimeType: mimetype
      }
    }
    const arrayBuffer = await response.arrayBuffer()
    const content = new Uint8Array(arrayBuffer)
    return {
      content,
      mimeType: mimetype
    }
  }
}

async function deleteFile(filePath: string): Promise<void> {
  await fs.unlink(filePath)
}
export {
  supportedSuxfixToMimeType,
  supportedMimeTypeToSuxfix,
  readFile,
  openFile,
  selectFiles,
  saveFile,
  saveFileWithDialog,
  openDirectory,
  getUint8ArrayContent,
  deleteFile,
  isHttpURL
}
