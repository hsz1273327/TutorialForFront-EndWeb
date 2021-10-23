'use strict'

onconnect = function (e) {
    let port = e.ports[ 0 ]

    port.onmessage = function (e) {
        let workerResult = 'Result: ' + e.data[ 0 ] * e.data[ 1 ]
        port.postMessage(workerResult)
    }
}