import './main.styl'
import { ImageRender } from './image_render'

const files = document.getElementById('files')
const abortbt = document.getElementById('abortbt')
const dropZone = document.getElementById('drop_zone')
const downloadbt = document.getElementById('download')

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
    for (let f of files) {
        if (!f.type.match('image.*')) {
            continue
        }
        reader = new ImageRender()
        ImageReadRender.reader.bindEvent(f)
        ImageReadRender.reader.readAsDataURL(f)
        output.push('<li><strong>',
            f.name,
            '</strong> (',
            f.type || 'n/a',
            ') - ',
            f.size,
            ' bytes, last modified: ',
            f.lastModifiedDate.toLocaleDateString(),
            '</li>')
        // Read in the image file as a data URL.
    }
    document.getElementById('output').innerHTML = '<ul>' + output.join('') + '</ul>'

}

function main () {
    let files = document.getElementById('files')
    let abortbt = document.getElementById('abortbt')
    let dropZone = document.getElementById('drop_zone')
    let downloadbt = document.getElementById('download')
}

main()