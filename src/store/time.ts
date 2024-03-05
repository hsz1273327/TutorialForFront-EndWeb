import { defineStore } from 'pinia'
import { ref, computed } from 'nativescript-vue';
const myWorker = new Worker("../workers/myworker.ts")

export function CloseWorker() {
    myWorker.terminate()
}
export function StartSendInterval(interval: number) {
    myWorker.postMessage({ "event": "start", "payload": interval })
}

export const useTimeStore = defineStore('time', () => {
    const nowTime = ref(new Date())
    const nowLocalTime = computed(() => nowTime.value.toLocaleString())
    const nowUTCTime = computed(() => nowTime.value.toUTCString())
    function update(ts: number) {
        nowTime.value = new Date(ts)
    }
    myWorker.onmessage = (evt) => {
        console.log(`get message ${JSON.stringify(evt.data)} from worker`)
        if (evt.data.event == 'update_ts_result') {
            update(evt.data.payload)
            console.log(`update nowTime ok`)
        }
    }
    return { nowTime, nowLocalTime, nowUTCTime, update }
})