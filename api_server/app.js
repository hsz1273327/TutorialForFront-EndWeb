import Koa from 'koa'
import logger from 'koa-pino-logger'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import router from './controller/index.js'

const app = new Koa()
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))
app.use(logger({ level: "warn" }))

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods());
export default app