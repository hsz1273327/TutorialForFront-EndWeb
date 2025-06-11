interface FileInfo {
  name?: string
  content: string | Uint8Array
  mimeType?: string
}

interface TargetSource {
  type: 'image' | 'video' | 'anchor' | 'text' | 'input'
  source?: string
  selectionStart?: number | null
  selectionEnd?: number | null
}

export type { FileInfo, TargetSource }
