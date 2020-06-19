export class ImageRender{
    /**
     * @desc 读取文件的处理对象
     * @public {HTMLElement} progress - 进度条
     * @public {ReaderRender} reader - 包装的读取对象.
     * @param {File} file - 要读取的文件对象
     * @param {Element} processElement - 进度条元素
     * @param {Element} imageElement - 图片的展示位置
     */
    constructor(file,output) {
        this.output = output
        this.file = file
        this.reader = new FileReader()
        this.row = document.createElement('li')
        let desc = document.createElement("strong")
        desc.innerText=`${this.file.name} ${this.file.type} - ${this.file.size} bytes last modified: ${this.file.lastModifiedDate.toLocaleDateString()}`
        this.row.appendChild(desc)
        this.progress_bar = document.createElement('div')
        this.progress_bar.style.width = '0%'
        this.progress_bar.textContent = '0%'
        this.output.appendChild(this.row)
        this.output.appendChild(this.progress_bar)
        
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
        this.reader.onprogress = (eve)=>this.updateProgress(eve)
        this.reader.onabort = this.onAbort
        this.reader.onloadstart = ()=>this.onLoadStart()
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
        this.row.removeChild(this.abortbt)
        alert('File read cancelled')
    }
    /**
     * 开始读取加载时的的回调函数
     * @param {Event} e - 事件
     */
    onLoadStart(e) {
        this.abortbt = document.createElement('button')
        this.abortbt.innerText="取消"
        this.abortbt.addEventListener("onclick",()=>{
            this.abort()
            //this.row.removeChild(this.abortbt)
        }, false)
        this.row.appendChild(this.abortbt)
        this.progress_bar.className = 'loading';
    }
    _onLoad(theFile) {
        return (e) =>{
            console.log("this.progress")
            console.log(this.progress_bar)
            //let progress = document.querySelector('.percent')
            this.progress_bar.style.width = '100%'
            this.progress_bar.textContent = '100%'

            let span = document.createElement('span')
            let image = document.createElement('img')
            image.src = e.target.result
            image.title = theFile.name
            image.className = "thumb"
            span.appendChild(image)
            let downloadbt=document.createElement('button')
            downloadbt.innerText="下载"
            //downloadbt.addEventListener("onclick", download, false)
            span.appendChild(downloadbt)
            this.row.appendChild(span)
            //setTimeout("document.getElementById('progress_bar').className='';", 2000);
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
                this.progress_bar.style.width = percentLoaded + '%'
                this.progress_bar.textContent = percentLoaded + '%'
            }
        }
    }
}
