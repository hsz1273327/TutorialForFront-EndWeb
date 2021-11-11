const Main = {
    async get(ctx) {
        ctx.body = JSON.stringify({
            "self": {
                "source": ctx.url,
                "description": "提供英雄信息的服务资源",
            },
            "hero": {
                "source": ctx.url + "hero"
            }
        })
    }
}
export default Main