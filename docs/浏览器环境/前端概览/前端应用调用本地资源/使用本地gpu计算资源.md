# 使用本地GPU的计算资源

[webgl](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)是浏览器上的opengl,它可以直接操作gpu进行运算渲染,然后渲染到canvas或者其他什么上面

webgl相当底层,并不适合没有opengl基础的人,而我们也没兴趣拿他做什么渲染,高性能计算才是我们感兴趣的.

google在2018年开源了他们基于webgl的前端高性能计算框架`tensorflow for javascript`(tfjs),当然这个框架主要是做deeplearning的,但即便如此我们也可以使用它来调用gpu来做一些计算工作.


## 前端项目使用tfjs进行矩阵计算

这个项目在[C2-S6-P1](https://github.com/TutorialForJavascript/frontend-basic/tree/master/code/C2/S6/P1)

这个项目只使用了tfjs的`matMul`接口.通常用tfjs做运算的流程是这样:

1. 使用数组创建张量(矩阵)`tf.tensor(arr)`,这个过程张量会被加载到gpu
2. 控制张量对象计算过程
3. 使用`.array()`接口从gpu中取出计算结果
4. 使用`tf.dispose(a)`或者`a.dispose()`手动释放张量内存,也可以使用
    ```js
    const y = tf.tidy(() => {
    const result = a.square().log().neg()
    return result
    })
    ```
    来回收一个函数中执行过程中产生的所有`Tensor`
    而这个`result`的值也就是这个y的值,注意这种方式无法返回Promise.

需要注意由于从gpu取出计算结果是一个异步的过程.

tfjs的接口可以在<https://js.tensorflow.org/api/latest/>找到,但拿前端训练数据实在是有点不现实.常规来说还是做做矩阵运算靠谱一些.


```js
class matMulApplication {

    constructor() {
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
    bindEvent() {
        this.form.onsubmit = (e) => {
            e.preventDefault()
            this.calcul()
        }
    }
    /**
     * 计算
     */
    randomMatrix(n, m) {
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
    async calcul() {
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
        let mx1_dom = this.renderMatrix("Matrix1",mx1_arr)
        let mx2_dom = this.renderMatrix("Matrix2",mx2_arr)
        let result_dom = this.renderMatrix("Result",result)
        while (this.result.firstChild){
            this.result.removeChild(this.result.firstChild)
        }
        this.result.appendChild(mx1_dom)
        this.result.appendChild(mx2_dom)
        this.result.appendChild(result_dom)

    }
    renderMatrix(title,mx_arr){
        let table = document.createElement("table")
        let caption = document.createElement("caption")
        caption.innerText=title
        table.appendChild(caption)
        for (let row of mx_arr){
            let tr = document.createElement("tr")
            for (let element of row){
                let td = document.createElement("td")
                td.innerText=element.toFixed(2)
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        return table
    }
}

function main() {
    let app = new matMulApplication()
}

main()
```

<!-- 我们用tfjs更多的当然是希望可以使用在其他平台上训练好的模型做一些机器学习的应用.
在后面两个例子中我们会分别介绍如何使用keras和TensorFlow本体训练tfjs可以调用的模型,以及如何使用tfjs调用这些模型. -->


<!-- ## 使用keras训练好的模型
<https://www.tensorflow.org/js/tutorials/conversion/import_keras>

## 使用TensorFlow训练好的模型
<https://www.tensorflow.org/js/tutorials/conversion/import_saved_model> -->