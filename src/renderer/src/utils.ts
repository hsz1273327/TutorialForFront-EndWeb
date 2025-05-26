import { TargetSource } from '../../common/file-info'
function getEventSource(event: MouseEvent): TargetSource {
  const target = event.target as HTMLElement
  const selection = window.getSelection()?.toString()
  if (target instanceof HTMLImageElement) {
    return { type: 'image', source: target.src }
  } else if (target instanceof HTMLVideoElement) {
    return { type: 'video', source: target.src }
  } else if (target instanceof HTMLAnchorElement) {
    return { type: 'anchor', source: target.href }
  } else if (target instanceof HTMLParagraphElement || target instanceof HTMLSpanElement) {
    return { type: 'text', source: target.innerText }
  } else if (selection && selection.length > 0) {
    return { type: 'text', source: selection }
  } else {
    console.log('右键其它元素', target)
    throw new Error('Unsupported target type')
  }
}

export { getEventSource }
