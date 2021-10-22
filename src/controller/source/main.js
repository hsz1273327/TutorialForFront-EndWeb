const Main = {
    async get(ctx) {
        ctx.body = JSON.stringify({
            "self":{
                "source":ctx.url,
                "description":"提供提醒的服务资源",
            },
            "notification":{
                "source":ctx.url+"notification"
            }
        })
    }
}
export default Main