export const change_status=(notification,next_status)=>{
    let status = notification.status
    let status_log = notification.status_log
    let log = {
        from: status,
        to: next_status,
        at: new Date().getTime(),
        msg: null
    }
    if (status_log) {
        status_log.push({
            log
        })

    } else {
        status_log = [log]
    }
    return {
        status: next_status,
        status_log: status_log
    }
}