'use strict'

let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition
let SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList
let SpeechRecognitionEvent = webkitSpeechRecognitionEvent || SpeechRecognitionEvent

const colors = [ 'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow' ]
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

class SpeechRecongnitionApp {
    constructor () {
        // 初始化语音识别接口
        this.recognition = new SpeechRecognition()
        this.speechRecognitionList = new SpeechGrammarList()
        this.speechRecognitionList.addFromString(grammar, 1)
        this.recognition.grammars = this.speechRecognitionList
        this.recognition.lang = 'en-US'
        this.recognition.interimResults = false
        this.recognition.maxAlternatives = 1

        //控件
        this.diagnostic = document.querySelector('.output')
        this.bg = document.querySelector('html')
        this.hints = document.querySelector('.hints')
        this.bindEvent()
    }

    bindEvent () {
        document.body.onclick = () => this.startRecongnition()
        this.recognition.onresult = event => this.onResult(event)
        this.recognition.onspeechend = () => this.onSpeeched()
        this.recognition.onnomatch = event => this.onNoMatch()
        this.recognition.onerror = event => this.onError(event)
    }

    htmlRender () {
        let colorHTML = ''
        colors.forEach(function (v, i, a) {
            console.log(v, i)
            colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>'
        })
        this.hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.'
    }
    startRecongnition () {
        this.recognition.start()
        console.log('Ready to receive a color command.')
    }
    onResult (event) {
        let last = event.results.length - 1
        let color = event.results[ last ][ 0 ].transcript
        this.diagnostic.textContent = 'Result received: ' + color + '.'
        this.bg.style.backgroundColor = color
        console.log('Confidence: ' + event.results[ 0 ][ 0 ].confidence)
    }
    onSpeeched () {
        this.recognition.stop()
    }
    onNoMatch () {
        this.diagnostic.textContent = "I didn't recognise that color."
    }
    onError (event) {
        this.diagnostic.textContent = 'Error occurred in recognition: ' + event.error
    }
}

function main () {
    let app = new SpeechRecongnitionApp()
    app.htmlRender()
}

main()