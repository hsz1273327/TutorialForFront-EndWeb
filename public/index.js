
function main () {
    let url = 'http://localhost:5000/stream'

    let evtSource = new EventSource(url)
    evtSource.onmessage = function (e) {
        console.log('onmsg: ' + e.data)
        document.querySelector("#local_time").textContent = e.data
    }
    evtSource.onerror = function (e) {
        console.log('error', e)
        evtSource.close()
    }

}

main()

