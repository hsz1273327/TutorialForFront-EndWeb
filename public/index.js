'use strict'

const Synthesis = window.speechSynthesis
/**
 * 录像用的前端项目
 */
class SpeakApplication {
    /**
     * 
     */
    constructor () {
        // 控件
        this.inputForm = document.getElementById('form')
        this.inputTxt = document.getElementById('txt')
        this.voiceSelect = document.getElementById('select')
        this.pitch = document.getElementById('pitch')
        this.pitchValue = document.getElementById('pitch-value')
        this.rate = document.getElementById('rate')
        this.rateValue = document.getElementById('rate-value')

        // 绑定事件
        this.bindEvent()
    }
    get voices () {
        return Synthesis.getVoices().sort((a, b) => {
            const aname = a.name.toUpperCase()
            const bname = b.name.toUpperCase()
            if (aname < bname) {
                return -1
            } else if (aname == bname) {
                return 0
            } else {
                return +1
            }
        })
    }
    /**
     * 为输入输出设备和按钮绑定事件句柄的回调函数
     */
    bindEvent () {
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.renderPopulateVoiceList()
        }
        this.inputForm.onsubmit = event => this.onStart(event)
        this.pitch.onchange = () => this.onPitchChange()

        this.rate.onchange = () => this.onRateChange()
        this.voiceSelect.onchange = () => this.onSelectChange()
    }
    onStart (event) {
        event.preventDefault()
        this.speak()
        this.inputTxt.blur()
    }
    onPitchChange () {
        this.pitchValue.textContent = this.pitch.value
    }
    onRateChange () {
        this.rateValue.textContent = this.rate.value
    }
    onSelectChange () {
        this.speak()
    }
    /**
     * 页面初始化
     */
    init_render () {
        this.renderPopulateVoiceList()
    }
    /**
     * 渲染页面
     */
    render () {
        this.renderPopulateVoiceList()
    }
    /**
     * 渲染出语音选单
     */
    renderPopulateVoiceList () {
        //渲染语音选择项
        console.log(this.voiceSelect)
        let selectedIndex = Object.is(this.voiceSelect.selectedIndex, undefined) ? 0 : this.voiceSelect.selectedIndex
        this.voiceSelect.innerHTML = ''
        for (let i = 0; i < this.voices.length; i++) {
            let option = document.createElement('option')
            option.textContent = this.voices[ i ].name + ' (' + this.voices[ i ].lang + ')'
            if (this.voices[ i ].default) {
                option.textContent += ' -- DEFAULT'
            }
            option.setAttribute('data-lang', this.voices[ i ].lang)
            option.setAttribute('data-name', this.voices[ i ].name)
            this.voiceSelect.appendChild(option)
        }
        this.voiceSelect.selectedIndex = selectedIndex
    }

    /**
     * 发音
     */
    speak () {
        if (Synthesis.speaking) {
            console.error('speechSynthesis.speaking')
            return
        }
        if (this.inputTxt.value !== '') {
            let utterThis = new SpeechSynthesisUtterance(this.inputTxt.value)
            utterThis.onend = function (event) {
                console.log('SpeechSynthesisUtterance.onend')
            }
            utterThis.onerror = function (event) {
                console.error('SpeechSynthesisUtterance.onerror')
            }
            let selectedOption = this.voiceSelect.selectedOptions[ 0 ].getAttribute('data-name')
            for (let i = 0; i < this.voices.length; i++) {
                if (this.voices[ i ].name === selectedOption) {
                    utterThis.voice = this.voices[ i ]
                }
            }
            utterThis.pitch = pitch.value
            utterThis.rate = rate.value
            Synthesis.speak(utterThis)
        }
    }
}

/**
 * 入口函数,这个入口函数是一个异步函数
 */
function main () {
    let app = new SpeakApplication()
    app.init_render()
}

main()