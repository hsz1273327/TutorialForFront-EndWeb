import './style.css'
import { ImageRender } from './image_render'

const files = document.getElementById('files')
const dropZone = document.getElementById('drop_zone')
const output_div = document.getElementById('output')

let reader
function supportedFile () {
    if (("File" in window) && ("FileReader" in window) && ("FileList" in window) && ("Blob" in window)) {
        return true
    } else {
        return false
    }
}

/**
 * @desc 处理文件选择的回调函数
 * @param {Event} event - 事件对象
 */
function handleFileSelect (event) {
    let files = null
    /// 获取到文件
    if (event.type == "drop") {
        event.preventDefault() //不会跳转
        files = event.dataTransfer.files
    } else {
        files = event.target.files
    }
    /// 处理文件
    let output = []
    let output_ul = document.createElement('ul')
    output_div.appendChild(output_ul)
    for (let f of files) {
        if (!f.type.match('image.*')) {
            continue
        }
        reader = new ImageRender(f,output_ul)
        reader.bindEvent()
        reader.readAsDataURL()
    }
    //document.getElementById('output').innerHTML = '<ul>' + output.join('') + '</ul>'

}
/**
 * @desc 放置到位后的处理回调函数.
 * @param {Event} eve 
 */
function handleDragOver(eve) {
    eve.stopPropagation()
    eve.preventDefault()
    eve.dataTransfer.dropEffect = 'copy' // Explicitly show this is a copy.
}

function abortRead() {
    reader.abort()
}

function main () {
    if (supportedFile()) {
        files.addEventListener('change', handleFileSelect, false)
        dropZone.addEventListener('dragover', handleDragOver, false)
        dropZone.addEventListener('drop', handleFileSelect, false)
    } else {
        alert('The File APIs are not fully supported in this browser.')
    }
}

main()