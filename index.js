import {Worker,isMainThread} from 'worker_threads'


if (isMainThread) {
  // 这会在工作线程实例中重新加载当前文件。
    console.log(`在主线程中`)
    const worker1 = new Worker("./worker.js",{workerData:{tid:1}})
    const worker2 = new Worker("./worker.js",{workerData:{tid:2}})

    worker1.on("online",()=>worker1.postMessage("start"))
    worker2.on("online",()=>worker2.postMessage("start"))

    worker1.on("message",
    (message)=>console.log(`get msg ${message} from worker1 `))
    worker2.on("message",
    (message)=>console.log(`get msg ${message} from worker2 `))

    worker1.on("exit",()=>console.log(`worker1 exit`))
    worker2.on("exit",()=>console.log(`worker2 exit`))

} else {
  console.log('不在主线程中');
  console.log(isMainThread);  // 打印 'false'。
}