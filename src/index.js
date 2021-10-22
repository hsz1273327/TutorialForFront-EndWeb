class ReaderRender {
    /**
     * @desc 读取文件的处理对象
     * @public {HTMLElement} progress - 进度条
     * @public {ReaderRender} reader - 包装的读取对象.
     */
    constructor() {
        this.progress = document.querySelector('.percent')
        this.progress.style.width = '0%'
        this.progress.textContent = '0%'
        this.reader = new FileReader()
    }
    /**
     * 退出读取.
     */
    abort() {
        return this.reader.abort()
    }
    /**
     * 根据文件对象绑定读取事件
     * @param {File} f - 要读取的文件对象
     */
    bindEvent(f) {
        this.reader.onerror = this.errorHandler
        this.reader.onprogress = this.updateProgress
        this.reader.onabort = this.onAbort
        this.reader.onloadstart = this.onLoadStart
        this.reader.onload = this.onLoad(f)
    }
    /**
     * reader对象的readAsDataURL方法代理
     * @param {File} f - 要读取的文件对象
     */
    readAsDataURL(f) {
        return this.reader.readAsDataURL(f)
    }
    /**
     * 加载读取退出时的回调函数
     * @param {Event} e - 事件
     */
    onAbort(e) {
        alert('File read cancelled')
    }
    /**
     * 开始读取加载时的的回调函数
     * @param {Event} e - 事件
     */
    onLoadStart(e) {
        document.getElementById('progress_bar').className = 'loading';
    }
    _onLoad(theFile) {
        return function (e) {
            console.log("this.progress")
            let progress = document.querySelector('.percent')
            progress.style.width = '100%'
            progress.textContent = '100%'
            let span = document.createElement('span')
            span.innerHTML = [
                '<img class="thumb" src="',
                e.target.result,
                '" title="',
                theFile.name,
                '"/>'
            ].join('')
            document.getElementById('output').insertBefore(span, null)
            setTimeout("document.getElementById('progress_bar').className='';", 2000);
        }
    }
    /**
     * 使用读取的文件来构造加载reader的事件onload的句柄回调函数
     * @param {*} f - 读取的文件
     * @return {function(e: event)} - 构造成的onload事件的回调函数
     */
    onLoad(f) {
        return this._onLoad(f)
    }
    /**
     * 读取出错时的处理方式
     * @param {Event} eve - 事件
     */
    errorHandler(eve) {
        switch (eve.target.error.code) {
            case eve.target.error.NOT_FOUND_ERR:
                alert('File Not Found!')
                break
            case eve.target.error.NOT_READABLE_ERR:
                alert('File is not readable')
                break
            case eve.target.error.ABORT_ERR:
                break
            default:
                alert('An error occurred reading this file.')
        }
    }
    /**
     * 更新进度条
     * @param {Event} eve - 事件
     */
    updateProgress(eve) {
        // evt is an ProgressEvent.
        if (eve.lengthComputable) {
            let percentLoaded = Math.round((eve.loaded / eve.total) * 100);
            // Increase the progress bar length.
            if (percentLoaded < 100) {
                this.progress.style.width = percentLoaded + '%'
                this.progress.textContent = percentLoaded + '%'
            }
        }
    }
}

let ImageReadRender = {
    /**
     * @desc 图片读取渲染对象.
     * @public {HTMLElement} files - 读取文件的input标签
     * @public {HTMLElement} abortbt - 退出读取的按钮标签
     * @public {HTMLElement} dropZone - 拖拽的放置位置div标签
     * @public {ReaderRender} [reader=null] this is param.
     */
    files: document.getElementById('files'),
    abortbt: document.getElementById('abortbt'),
    dropZone: document.getElementById('drop_zone'),
    reader: null,
    /**
     * 将各种事件绑定到对应的控件上
     */
    bindEvent: function () {
        if (this.supported_File()) {
            this.files.addEventListener('change', this.handleFileSelect, false)
            this.dropZone.addEventListener('dragover', this.handleDragOver, false)
            this.dropZone.addEventListener('drop', this.handleFileSelect, false)
            this.abortbt.addEventListener("onclick", this.abortRead, false)
        } else {
            alert('The File APIs are not fully supported in this browser.')
        }

    },
    /**
     * 判断浏览器是否支持文件读取接口,并不是所有浏览器都支持.
     */
    supported_File: function () {
        if (("File" in window) && ("FileReader" in window) && ("FileList" in window) && ("Blob" in window)) {
            return true
        } else {
            return false
        }
    },
    /**
     * 点击取消按钮的事件回调函数
     */
    abortRead() {
        ImageReadRender.reader.abort()
    },
    /**
     * @desc 处理文件选择的回调函数
     * @param {Event} event - 事件对象
     */
    handleFileSelect: function (event) {
        let files = null
        /// 获取到文件
        if (event.type == "drop") {
            event.preventDefault() //不会跳转
            files = event.dataTransfer.files
        } else {
            files = event.target.files
        }
        /// 处理文件
        let output = [];
        for (let f of files) {
            if (!f.type.match('image.*')) {
                continue
            }
            ImageReadRender.reader = new ReaderRender()
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

    },
    /**
     * @desc 放置到位后的处理回调函数.
     * @param {Event} eve 
     */
    handleDragOver: function (eve) {
        eve.stopPropagation()
        eve.preventDefault()
        eve.dataTransfer.dropEffect = 'copy' // Explicitly show this is a copy.
    }
}

let main = () => {
    ImageReadRender.bindEvent()
}
main()