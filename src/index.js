const title = "test notification"
const options = {
    body: "test body",
    tag: "test tag",
    icon: "img/xkfy.png"
}

const showNotification = (callback, title, options) => {
    switch (Notification.permission) {
        case "granted":
            {
                console.log(Notification.permission)
                callback(title, options)
            }
            break
        default:
            alert("请先打开浏览器的通知权限")
    }
}

const showNotificationCallback = (title, options) => {
    let n = new Notification(title, options)
    n.onclick = () => {
        alert("on click")
    }
    n.onerror = () => {
        alert("on error")
    }
    n.onclose = () => {
        alert("on close")
    }
    n.onshow = () => {
        alert("on show")
    }
}


let main = () => {
    let button = document.querySelector("#button")
    button.onclick = () => showNotification(showNotificationCallback, title, options)
}
main()