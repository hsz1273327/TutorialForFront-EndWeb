# 集成wasm

浏览器中本身就支持WebAssembly,可以加载wasm文件用于计算密集型任务.在nativescript中android原生支持WebAssembly,但ios中就由于缺少JIT能力,很遗憾目前并没有对WebAssembly的支持.

本文的例子在[nsv-wasm分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-wasm)

虽然如此,但在仅需要针对android开发应用的场景下嵌入wasm依然是计算密集型任务的好办法.

用法和[在浏览器中](https://developer.mozilla.org/zh-CN/docs/WebAssembly)一样,我们仅仅需要将从远端获取wasm文件改为从本地获取即可.

```ts
import { knownFolders, path, File } from '@nativescript/core'
...
const wasm_path = path.join(knownFolders.currentApp().path, "assets/wasm/add.wasm")
const wasm_content = await File.fromPath(wasm_path).read() //从文件系统中读取wasm文件
const fabwasmCode = new Uint8Array(wasm_content) //转成Unit8Array
const wasmModule = await WebAssembly.compile(fabwasmCode) // 编译成模块
const wasm_instance  = await WebAssembly.instantiate(wasmModule); // 模块实例化
const result = wasm_instance.exports.add(1,5) //调用实例的add函数
```

## 例子

我们借用[mdn中的例子](https://github.com/mdn/webassembly-examples/blob/main/understanding-text-format/add.wasm)来演示最简单的调用过程

```vue
<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="执行exported_func" @tap="onActionTap" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "nativescript-vue"
import { knownFolders, path, File } from '@nativescript/core'

const wasm = ref()

function onActionTap(evt) {
    if (wasm.value) {
        try {
            // let res = wasm.value.exports.exported_func()
            let res = wasm.value.exports.add(1,5)
            console.log(`fab wasm get result ${res}`)
        } catch (error) {
            console.log(`fab wasm get error ${error}`)
        }

    } else {
        console.log(`not load fab wasm yet`)
    }
}
async function load_wasm() {
    try {
        const importObject = {
            imports: {
                imported_func: arg => {
                    console.log(arg);
                }
            }
        }
        // const wasm_path = path.join(knownFolders.currentApp().path, "assets/wasm/simple.wasm")
        const wasm_path = path.join(knownFolders.currentApp().path, "assets/wasm/add.wasm")
        console.log(`load fab wasm file path ok`)
        const wasm_content = await File.fromPath(wasm_path).read()
        console.log(`load fab wasm file ok`)
        let fabwasmCode = new Uint8Array(wasm_content)
        console.log(`load fab wasm to uint8array ok`)
        let wasmModule = await WebAssembly.compile(fabwasmCode)
        console.log(`load fab wasm to module ok`)
        // wasm.value  = await WebAssembly.instantiate(wasmModule, importObject);
        wasm.value  = await WebAssembly.instantiate(wasmModule);
        console.log(`load fab wasm ok`)
    } catch (error) {
        console.log(`load fab wasm get error ${error}`)
    }
}
onMounted(() => {
    console.log(`load_fab_wasm start`)
    load_wasm()
})
</script>
```