'use strict'

const RECORD_MIME_TYPES = [ 'video/webm;codecs=vp8', 'video/webm;codecs=vp9' ]
/**
 * 录像用的前端项目
 */
class RecordApplication {
    /**
     * @public {HTMLElement} videoElement - 展示摄像机捕获内容的video标签
     * @public {HTMLElement} audioInputSelect - 选择音频输入的元素
     * @public {HTMLElement} audioOutputSelect - 选择音频输出的元素
     * @public {HTMLElement} videoSelect - 选择视频输入的元素
     * @public {Array[HTMLElement]} selectors - 保存所有的输入输出设备元素
     */
    constructor () {
        // 展示
        this.videoElement = document.querySelector('video')
        /// 输入输出选择
        this.audioInputSelect = document.querySelector('select#audioSource')
        this.audioOutputSelect = document.querySelector('select#audioOutput')
        this.videoSelect = document.querySelector('select#videoSource')
        this.selectors = [ this.audioInputSelect, this.audioOutputSelect, this.videoSelect ]
        // 保存

        // this.mediaSource = new MediaSource()
        this.mediaRecorder = null
        this.recordedBlobs = []
        this.lastrecordedBlobs = null
        // this.sourceBuffer = null
        this.opr = false // 当它设置为true时点击录制无效
        this.current_mime_type = null
        this.last_mime_type = null

        this.mimetype_selected = document.querySelector('#mimetype_selected')
        //// 按钮
        this.MimetypeSelect = document.querySelector('select#videoMineType')
        this.RecordButton = document.querySelector('#record')
        this.downloadButton = document.querySelector('#download')
        // 截图
        this.canvas = document.querySelector('canvas')
        this.canvas.width = 480
        this.canvas.height = 360
        this.canvas.hidden = true
        // 按钮
        this.snapButton = document.querySelector('#snap')
        this.bindEvent()
    }
    /**
     * 为输入输出设备和按钮绑定事件句柄的回调函数
     */
    bindEvent () {
        this.audioInputSelect.onchange = () => this.display()
        this.audioOutputSelect.onchange = () => this.changeAudioDestination()
        this.videoSelect.onchange = () => this.display()
        this.RecordButton.onclick = () => this.record()
        this.snapButton.onclick = () => this.snapshot()
        this.downloadButton.onclick = () => this.download()
    }
    /**
     * 初始化页面
     */
    async init_render () {
        try {
            let media_device_infos = await navigator.mediaDevices.enumerateDevices()
            this.renderDevices(media_device_infos)
            this.renderMimetype()
        } catch (error) {
            console.log('navigator.getUserMedia error: ', error)
        }
    }

    async record () {
        if (this.opr) {
            alert("now is starting/stoping record, please wait a while then try again!")
        } else {
            this.opr = true
            if (this.RecordButton.value === "false") {
                this.start_record()
            } else {
                this.stop_record()
            }
            this.opr = false
        }
    }
    start_record () {
        let options = {
            mimeType: this.MimetypeSelect.value
        }
        this.mediaRecorder = new MediaRecorder(window[ "stream" ], options)
        this.current_mime_type = this.MimetypeSelect.value
        this.mediaRecorder.onstop = event => console.log('Recorder stopped: ', event)
        this.mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                this.recordedBlobs.push(event.data)
            }
        }
        this.mediaRecorder.start(10)
        this.renderStart()
    }
    renderStart () {
        this.RecordButton.value = "true"
        while (this.RecordButton.firstChild) {
            this.RecordButton.removeChild(this.RecordButton.firstChild)
        }
        let span = document.createElement('span')
        span.setAttribute("class", "icon iconfont icon-tingzhi")
        this.RecordButton.appendChild(span)
        this.snapButton.hidden = false
        this.MimetypeSelect.hidden = true
        this.downloadButton.hidden = true
        this.mimetype_selected.textContent = `MimeType: ${ this.current_mime_type } for download`
        this.mimetype_selected.hidden = false
    }
    stop_record () {
        this.mediaRecorder.stop()
        this.lastrecordedBlobs = this.recordedBlobs
        this.recordedBlobs = []

        this.last_mime_type = this.current_mime_type
        this.current_mime_type = null
        console.log('Recorded Blobs: ', this.lastrecordedBlobs)
        this.renderStop()
    }
    renderStop () {
        this.RecordButton.value = "false"
        while (this.RecordButton.firstChild) {
            this.RecordButton.removeChild(this.RecordButton.firstChild)
        }
        let span = document.createElement('span')
        span.setAttribute("class", "icon iconfont icon-luzhi")
        this.RecordButton.appendChild(span)
        this.snapButton.hidden = true
        this.MimetypeSelect.hidden = false
        this.downloadButton.hidden = false
        this.mimetype_selected.textContent = `MimeType: ${ this.last_mime_type } for download`
        this.mimetype_selected.hidden = false
    }

    download () {
        if (this.lastrecordedBlobs.length === 0) {
            alert("already downloaded")
        } else {
            let mimetype = this.last_mime_type.split(";")[ 0 ]
            let blob = new Blob(this.lastrecordedBlobs, {
                type: mimetype
            })
            let data = window.URL.createObjectURL(blob)
            let suffix = "." + mimetype.split("/")[ 1 ]
            let filename = new Date().toISOString() + suffix
            this.savefile(data, filename)
        }
    }
    savefile (data, filename) {
        let save_link = document.createElement('a')
        save_link.href = data
        save_link.download = filename

        let event = document.createEvent('MouseEvents')
        event.initEvent("click", true, false)
        save_link.dispatchEvent(event)
    }
    snapshot () {
        this.canvas.getContext('2d').drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height)
        let img_png_src = this.canvas.toDataURL("image/png")
        let imgData = img_png_src.replace("image/png", 'image/octet-stream')
        let filename = new Date().toISOString() + ".png"
        this.savefile(imgData, filename)
    }

    /**
     * 将指定的输出音频设备放入指定媒体元素
     * @param {HTMLElement} element - 要重置的video元素
     * @param {string} sinkId - 音频设备id
     */
    async attachSinkId (element, sinkId) {
        if (typeof element.sinkId !== 'undefined') {
            try {
                await element.setSinkId(sinkId)
                console.log('Success, audio output device attached: ' + sinkId)
            } catch (error) {
                let errorMessage = error
                if (error.name === 'SecurityError') {
                    errorMessage = 'You need to use HTTPS for selecting audio output ' + 'device: ' + error
                }
                console.error(errorMessage)
                // Jump back to first output device in the list as it's the default.
                audioOutputSelect.selectedIndex = 0
            }
        } else {
            console.warn('Browser does not support output device selection.')
        }
    }
    /**
     * 切换音频输出的设备
     */
    async changeAudioDestination () {
        let audioDestination = this.audioOutputSelect.value
        await this.attachSinkId(this.videoElement, audioDestination)
    }
    /**
     * 开始播放收集到的音频视频
     */
    async display () {
        if (window[ "stream" ]) {
            window[ "stream" ].getTracks().forEach(track => {
                track.stop()
            })
        }
        let audioSource = this.audioInputSelect.value
        let videoSource = this.videoSelect.value
        let constraints = {
            audio: {
                //deviceId: audioSource && audioSource !== "Local Display" ? {
                deviceId: audioSource ? {
                    exact: audioSource
                } : undefined
            },
            video: {
                deviceId: videoSource && videoSource !== "Local Display" ? {
                    exact: videoSource
                } : undefined
            }
        }
        try {
            let input_media_stream = await navigator.mediaDevices.getUserMedia(constraints)
            if (videoSource === "Local Display") {
                // if (videoSource === "Local Display" || audioSource === "Local Display") {
                let display_media_stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true
                })
                // let display_media_stream = await navigator.mediaDevices.getDisplayMedia({
                //     video: true,
                //     audio: true
                // })
                // if (audioSource === "Local Display"){
                //     let input_audio_tracks = input_media_stream.getAudioTracks()
                //     input_audio_tracks.forEach((x)=>input_media_stream.removeTrack(x))
                //     let display_audio_tracks = display_media_stream.getAudioTracks()
                //     console.log(display_audio_tracks)
                //     display_audio_tracks.forEach((x)=>input_media_stream.addTrack(x))
                // }
                if (videoSource === "Local Display") {
                    let input_video_tracks = input_media_stream.getVideoTracks()
                    input_video_tracks.forEach(x => input_media_stream.removeTrack(x))
                    let display_video_tracks = display_media_stream.getVideoTracks()
                    console.log(display_video_tracks)
                    display_video_tracks.forEach(x => input_media_stream.addTrack(x))
                }
            }
            this.setStream(input_media_stream)
            await this.init_render()
        } catch (error) {
            console.log('navigator.getUserMedia error: ', error)
        }
    }
    /**
     * 通过流数据获取流对应的媒体设备信息
     * @param {MediaStream} stream 
     */
    setStream (stream) {
        window[ "stream" ] = stream // make stream available to console
        this.videoElement.srcObject = stream
    }
    renderMimetype () {
        while (this.MimetypeSelect.firstChild) {
            this.MimetypeSelect.removeChild(this.MimetypeSelect.firstChild)
        }
        for (let mimetype of RECORD_MIME_TYPES) {
            if (MediaRecorder.isTypeSupported(mimetype)) {
                let option = document.createElement('option')
                option.value = mimetype
                option.text = mimetype
                this.MimetypeSelect.appendChild(option)
            } else {
                console.log(`recorder unsupport ${ mimetype }`)
            }
        }
        this.snapButton.hidden = true
        this.downloadButton.hidden = true
        this.mimetype_selected.hidden = true
        this.MimetypeSelect.hidden = false
    }
    /**
     * 通过媒体设备信息来构造媒体选择页面
     * @param {MediaDeviceInfo} deviceInfos 
     */
    renderDevices (deviceInfos) {
        // Handles being called several times to update labels. Preserve values.
        let values = this.selectors.map(select => {
            select.value
        })
        this.selectors.forEach(select => {
            while (select.firstChild) {
                select.removeChild(select.firstChild)
            }
        })
        for (let deviceInfo of deviceInfos) {
            let option = document.createElement('option')
            option.value = deviceInfo.deviceId
            switch (deviceInfo.kind) {
                case 'audioinput':
                    option.text = deviceInfo.label || 'microphone ' + (this.audioInputSelect.length + 1)
                    this.audioInputSelect.appendChild(option)
                    break
                case 'audiooutput':
                    option.text = deviceInfo.label || 'speaker ' + (this.audioOutputSelect.length + 1)
                    this.audioOutputSelect.appendChild(option)
                    break
                case 'videoinput':
                    option.text = deviceInfo.label || 'camera ' + (this.videoSelect.length + 1)
                    this.videoSelect.appendChild(option)
                    break
                default:
                    console.log('Some other kind of source/device: ', deviceInfo)
            }
        }
        // let audio_display_option = document.createElement('option')
        // audio_display_option.value = "Local Display"
        // audio_display_option.text = "Local Display"
        // this.audioInputSelect.appendChild(audio_display_option)

        let video_display_option = document.createElement('option')
        video_display_option.value = "Local Display"
        video_display_option.text = "Local Display"
        this.videoSelect.appendChild(video_display_option)
    }
}
/**
 * 入口函数,这个入口函数是一个异步函数
 */
async function main () {
    let app = new RecordApplication()
    await app.init_render()
    await app.display()
}

main()