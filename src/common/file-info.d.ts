interface FileInfo {
  name?: string
  content: string | Uint8Array
  mimeType?: string
}

interface TargetSource {
  type: 'image' | 'video' | 'anchor' | 'text'
  source?: string
}

export type { FileInfo, TargetSource }
