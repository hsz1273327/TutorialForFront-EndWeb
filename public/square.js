'use strict'

class SquareApplication {

    constructor () {
        // 控件
        this.squareNumber = document.querySelector('#number3')
        this.result2 = document.querySelector('.result2')
        this.form = document.querySelector('form')
        this.myWorker = new SharedWorker("worker.js")
        // 绑定事件
        this.bindEvent()
    }

    /**
     * 为输入输出设备和按钮绑定事件句柄的回调函数
     */
    bindEvent () {
        this.squareNumber.onchange = () => this.query()
        this.form.onsubmit = function (e) {
            e.preventDefault()
        }
        this.myWorker.port.onmessage = event => this.onResult(event)
    }
    /**
     * 向worker请求计算结果
     */
    query () {
        this.myWorker.port.postMessage([ this.squareNumber.value, this.squareNumber.value ])
        console.log('Message posted to worker')
    }
    /**
     * 收到结果后将其渲染到result位置
     * @param {Event} event - 消息传递事件
     */
    onResult (event) {
        this.result2.textContent = event.data
        console.log('Message received from worker')
    }
}

/**
 * 入口函数,这个入口函数是一个异步函数
 */
function main () {
    let app = new SquareApplication()
}

main()