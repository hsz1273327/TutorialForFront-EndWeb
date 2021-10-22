import Koa from 'koa'
const app = new Koa()

app.use(async ctx => {
    ctx.response.type='application/json'
    ctx.body = JSON.stringify({
        'message': 'Hello World'
    })
})

app.listen(3000)