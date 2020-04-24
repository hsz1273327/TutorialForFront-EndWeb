class ImageRender{
    /**
     * @desc 读取文件的处理对象
     * @public {HTMLElement} progress - 进度条
     * @public {ReaderRender} reader - 包装的读取对象.
     * @param {File} file - 要读取的文件对象
     * @param {Element} processElement - 进度条元素
     * @param {Element} imageElement - 图片的展示位置
     */
    constructor(file,processElement,imageElement) {
        this.progress = processElement
        this.file = file
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
     */
    bindEvent() {
        this.reader.onerror = this.errorHandler
        this.reader.onprogress = this.updateProgress
        this.reader.onabort = this.onAbort
        this.reader.onloadstart = this.onLoadStart
        this.reader.onload = this.onLoad()
    }
    /**
     * reader对象的readAsDataURL方法代理

     */
    readAsDataURL() {
        return this.reader.readAsDataURL(this.file)
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
     * @return {function(e: event)} - 构造成的onload事件的回调函数
     */
    onLoad() {
        return this._onLoad(this.file)
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

export ImageRender