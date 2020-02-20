import {Worker,isMainThread} from 'worker_threads'


if (isMainThread) {
  // 这会在工作线程实例中重新加载当前文件。
    console.log(`在主线程${__filename}中`)
    const worker = new Worker()
} else {
  console.log('在工作线程中');
  console.log(isMainThread);  // 打印 'false'。
}