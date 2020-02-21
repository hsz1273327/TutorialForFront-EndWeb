import {Worker,isMainThread} from 'worker_threads'


if (isMainThread) {
  // 这会在工作线程实例中重新加载当前文件。
    console.log(`在主线程中`)
    const worker1 = new Worker("./worker.js",{workerData:{tid:1}})
    const worker2 = new Worker("./worker.js",{workerData:{tid:2}})
} else {
  console.log('不在主线程中');
  console.log(isMainThread);  // 打印 'false'。
}