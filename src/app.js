import Koa from 'koa'
import logger from 'koa-pino-logger'
import koaBody from 'koa-body'
import routes from './controller/index'
const app = new Koa()
app.use(logger())
app.use(koaBody())
app.use(routes)

export default app