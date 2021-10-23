'use strict'

/**
 * 计算乘法用的应用
 */
class MulApplication {
    /**
     * 
     */
    constructor () {
        // 控件
        this.first = document.querySelector('#number1')
        this.second = document.querySelector('#number2')
        this.result = document.querySelector('.result')
        this.myWorker = new Worker("worker.js")
        // 绑定事件
        this.bindEvent()
    }

    /**
     * 为输入输出设备和按钮绑定事件句柄的回调函数
     */
    bindEvent () {
        this.first.onchange = () => this.query()
        this.second.onchange = () => this.query()
        this.myWorker.onmessage = event => this.onResult(event)
        this.myWorker.onerror = e => console.log(e)
    }

    query () {
        this.myWorker.postMessage([ this.first.value, this.second.value ])
        console.log('Message posted to worker')
    }
    onResult (event) {
        this.result.textContent = event.data
        console.log('Message received from worker')
    }
}

/**
 * 入口函数,这个入口函数是一个异步函数
 */
function main () {
    let app = new MulApplication()
}

main()