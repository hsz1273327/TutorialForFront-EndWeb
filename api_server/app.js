import Koa from 'koa'
import logger from 'koa-pino-logger'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import { apiRouter } from './controller/index.js'
const app = new Koa()

// app.use(cors())
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))
app.use(logger({ level: "warn" }))

app.use(koaBody())
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())
export default app