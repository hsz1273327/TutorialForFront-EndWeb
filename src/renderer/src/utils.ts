import { TargetSource } from '../../common/file-info'
function getEventSource(event: MouseEvent): TargetSource {
  const target = event.target as HTMLElement
  const selection = window.getSelection()?.toString()
  if (target instanceof HTMLImageElement) {
    return { type: 'image', source: target.src }
  } else if (target instanceof HTMLVideoElement) {
    return { type: 'video', source: target.src }
  } else if (target instanceof HTMLAnchorElement) {
    if (target.href) {
      return { type: 'anchor', source: target.href }
    } else {
      console.log('右键其它元素', target)
      throw new Error('Unsupported target type')
    }
  } else if (
    target instanceof HTMLParagraphElement ||
    target instanceof HTMLHeadingElement ||
    target.tagName === 'CODE'
  ) {
    return { type: 'text', source: target.innerText }
  } else if (
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLInputElement &&
      ['email', 'password', 'search', 'tel', 'text', 'url'].includes(target.type))
  ) {
    return {
      type: 'input',
      source: target.value,
      selectionStart: target.selectionStart,
      selectionEnd: target.selectionEnd
    }
  } else if (selection && selection.length > 0) {
    return { type: 'text', source: selection }
  } else {
    console.log('右键其它元素', target)
    throw new Error('Unsupported target type')
  }
}

export { getEventSource }
