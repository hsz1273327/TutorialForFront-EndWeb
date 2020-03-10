
let notify = {
    checkBrowserSupport: function(){
        if (!"Notification" in window) {
            return false
        } else {
            return true
        }
    },
    checkUserPermission: function(){
        let support = this.checkBrowserSupport()
        if (support===true){
            if(Notification.permission === "granted"){
                alert("用户允许通知")
            }else if(Notification.permission === "denied"){
                alert("用户拒绝通知")
            }else{
                alert("用户还没选择，去向用户申请权限吧")
            }
        }else{
            alert("浏览器不支持Notification")
        }
        
    },
    requestNotificationPromise: async function() {
        try {
            let result = await  Notification.requestPermission()
            console.log(result)
        } catch(e) {
          return false
        }
        return true
    },
    sendNotification: function() {
        let notification = new Notification("测试推送", {
            body: '测试推送的内容',
            requireInteraction: true
        })
        notification.onshow = function (){console.log("消息推送了")}
        notification.onclose = function (){console.log("消息关闭了")}
        setTimeout(function() {
            notification.close()
        }, 3000)
    },
    run: function(){
        let check_but = document.getElementById("check")
        check_but.onclick = ()=>this.checkUserPermission()
        let ask_but = document.getElementById("ask")
        ask_but.onclick = ()=>this.requestNotificationPromise()
        let try_but = document.getElementById("try")
        try_but.onclick = ()=>this.sendNotification()
    }

}

notify.run()