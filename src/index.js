import Koa from 'koa'
import test_ext from './test_extension.js'
const app = new Koa()
app.use(test_ext("hsz"))
app.use(test_ext("222"))
app.use(async ctx => {
    ctx.response.type='application/json'
    ctx.body = JSON.stringify({
        'message': 'Hello World'
    })
})

app.listen(3000)