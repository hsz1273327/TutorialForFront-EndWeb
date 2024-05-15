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