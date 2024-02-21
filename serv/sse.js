import Koa from 'koa'
import sse from 'koa-sse-stream'
import Router from 'koa-router'

const app = new Koa()


app.use(sse({
    maxClients: 5000,
    pingInterval: 30000
}))

let router = new Router()
router.get('/stream', async (ctx) => {
    let interval = setInterval(() => {
        let date = (new Date()).toString()
        ctx.sse.send(date)
        console.log('send Date : ' + date)
    }, 1000)
    ctx.sse.on('close', (...args) => {
        console.log('clear interval')
        clearInterval(interval)
    })
})

app.use(router.routes())
    .use(router.allowedMethods())
app.listen(5000)