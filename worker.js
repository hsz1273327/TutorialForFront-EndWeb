import { workerData } from 'worker_threads'
console.log(`child thread ${ workerData.tid } ok`)