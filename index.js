import {Worker,isMainThread} from 'worker_threads'


if (isMainThread) {
  // 这会在工作线程实例中重新加载当前文件。
    console.log(`在主线程中`)
    let sharedBuffer = new SharedArrayBuffer(16)
    let workers = [0,1,2,3,4].map(
        (i)=>new Worker("./worker.js",{workerData:{tid:i,sharedBuffer}})
    )
    let promises = workers.map(
        (worker,index)=>{
            worker.on(
            "online",
            ()=>worker.postMessage("start")
            )
            
            let p = new Promise( 
                (resolve, reject)=>{
                    worker.on(
                        "exit",
                        ()=>{
                            console.log(`worker ${index} exit`)
                            resolve("done")
                        }
                    )
                }
            )
            return p
        }
    )
    Promise.all(promises).then(
        data=>{
            console.log(data)
            let v1 = new Int32Array(sharedBuffer)
            let result = Array.from(v1)
            console.log(`get result ${result}`)
        }
    ).catch(
        error=>console.error(error)
    )

} else {
  console.log('不在主线程中');
  console.log(isMainThread);  // 打印 'false'。
}