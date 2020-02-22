import process from 'process'
import { parentPort, workerData } from 'worker_threads'

const workerID = workerData.tid
const sharedBuffer = workerData.sharedBuffer

function fac (n) {
    let result = n
    while (n > 1) {
        n -= 1
        result = result * n
    }
    return result
}

console.log(`child worker ${ workerID } ok`)

parentPort.on('message',
    (message) => {
        if (message === 'start') {
            let answer = fac(workerID + 1)
            let v1 = new Int32Array(sharedBuffer)
            v1[ workerID ] = answer
            process.exit()
        } else {
            console.log(`${ workerID }: unknown message`)
        }
    }
)