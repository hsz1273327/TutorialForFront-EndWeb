import Koa from 'koa'
import path from 'path'
import { fileURLToPath } from 'url';
import logger from 'koa-pino-logger'
import router from 'koa-route'
import static_ext from 'koa-static'
import cors from 'koa2-cors'

const app = new Koa()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const static_path = path.resolve(__dirname, "./public")
app.use(logger())
app.use(cors())
app.use(static_ext(static_path))
app.use(router.get('/test', async ctx => {
    ctx.response.type = 'application/json'
    ctx.body = JSON.stringify({
        'message': 'Hello World'
    })
}))

app.listen(4000)