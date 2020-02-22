import process from 'process'
import { workerData,parentPort } from 'worker_threads'

const workerID = workerData.tid

console.log(`child worker ${ workerID } ok`)

function sendmsg(){
    console.log(`${workerID}: get message start`)
    let counter = 0
    let c = setInterval(()=>{
        parentPort.postMessage(counter)
        counter += 1
    },1000)
    setTimeout(()=>{
        clearInterval(c)
        process.exit()
    },10000) 
    
}

parentPort.on('message',
(message)=>{
    if (message==='start'){
        sendmsg()
    }else{
        console.log(`${workerID}: unknown message`)
    }
}
)