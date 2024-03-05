// 这个worker用于

// load NativeScript globals in the worker thread
import '@nativescript/core/globals'

let interval_task_id = null

self.onmessage = (evt) => {
    console.log('Message received from the main thread.')
    const data = evt.data // data from myMessage
    switch (data.event) {
        case "start":
            {
                console.log(`received start event`)
                interval_task_id = setInterval(()=>{
                    self.postMessage({ "event": "update_ts_result","payload": (new Date()).getTime() })
                    console.log(`send message to main`)
                },data.payload)
            }
            break;
        default:
            {
                console.log(`received unknown event ${data.event}`)
            }
            break;
    }
}

self.onclose = () => {
    if (interval_task_id){
        clearInterval(interval_task_id)
        console.log('close interval_task')
    }
    console.log('close ok')
}

self.onerror = (evt): boolean => {
    return true
}