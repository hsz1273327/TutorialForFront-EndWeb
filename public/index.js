'use strict'

/**
 * 计算乘法用的应用
 */
class matMulApplication {

    constructor () {
        // 控件
        this.n = document.querySelector('#n')
        this.m = document.querySelector('#m')
        this.form = document.querySelector('form')
        this.result = document.querySelector('#result')
        // 绑定事件
        this.bindEvent()
    }

    /**
     * 为输入输出设备和按钮绑定事件句柄的回调函数
     */
    bindEvent () {
        this.form.onsubmit = e => {
            e.preventDefault()
            this.calcul()
        }
    }
    /**
     * 计算
     */
    randomMatrix (n, m) {
        let result = []
        for (let i = 0; i < n; i++) {
            let row = []
            for (let j = 0; j < m; j++) {
                row.push(Number(Math.random().toFixed(2)))
            }
            result.push(row)
        }
        return tf.tensor(result)
    }
    async calcul () {
        let n = this.n.value
        let m = this.m.value
        let mx1 = this.randomMatrix(n, m)
        let mx2 = this.randomMatrix(m, n)
        let mx1_arr = await mx1.array()
        let mx2_arr = await mx2.array()
        let result_mat = mx1.matMul(mx2)
        let result = await result_mat.array()
        mx1.dispose()
        mx2.dispose()
        result_mat.dispose()
        let mx1_dom = this.renderMatrix("Matrix1", mx1_arr)
        let mx2_dom = this.renderMatrix("Matrix2", mx2_arr)
        let result_dom = this.renderMatrix("Result", result)
        while (this.result.firstChild) {
            this.result.removeChild(this.result.firstChild)
        }
        this.result.appendChild(mx1_dom)
        this.result.appendChild(mx2_dom)
        this.result.appendChild(result_dom)
    }
    renderMatrix (title, mx_arr) {
        let table = document.createElement("table")
        let caption = document.createElement("caption")
        caption.innerText = title
        table.appendChild(caption)
        for (let row of mx_arr) {
            let tr = document.createElement("tr")
            for (let element of row) {
                let td = document.createElement("td")
                td.innerText = element.toFixed(2)
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        return table
    }
}

function main () {
    let app = new matMulApplication()
}

main()