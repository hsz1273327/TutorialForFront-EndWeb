'use strict'

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
        this.videoElement = document.querySelector('video')
        this.audioInputSelect = document.querySelector('select#audioSource')
        this.audioOutputSelect = document.querySelector('select#audioOutput')
        this.videoSelect = document.querySelector('select#videoSource')
        this.selectors = [ this.audioInputSelect, this.audioOutputSelect, this.videoSelect ]
        this.bindEvent()
    }
    /**
     * 为输入输出设备和按钮绑定事件句柄的回调函数
     */
    bindEvent () {
        this.audioInputSelect.onchange = () => this.display()
        this.audioOutputSelect.onchange = () => this.changeAudioDestination()
        this.videoSelect.onchange = () => this.display()
    }
    /**
     * 初始化页面
     */
    async init_render () {
        try {
            let media_device_infos = await navigator.mediaDevices.enumerateDevices()
            this.renderDevices(media_device_infos)
        } catch (error) {
            console.log('navigator.getUserMedia error: ', error)
        }
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
                deviceId: audioSource ? {
                    exact: audioSource
                } : undefined
            },
            video: {
                deviceId: videoSource ? {
                    exact: videoSource
                } : undefined
            }
        }
        try {
            let media_stream = await navigator.mediaDevices.getUserMedia(constraints)
            this.setStream(media_stream)
            await this.init_render()
        } catch (error) {
            console.log('navigator.getUserMedia error: ', error)
        }
    }
    /**
     * 通过流数据获取流对应的媒体设备信息
     * @param {MediaStream} stream 
     */
    async setStream (stream) {
        window[ "stream" ] = stream // make stream available to console
        this.videoElement.srcObject = stream
        // Refresh button list in case labels have become available
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