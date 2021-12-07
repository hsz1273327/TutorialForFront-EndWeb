import websockify from 'koa-websocket'
import { wsRouter } from './controller/index.js'



export function InitWS (app) {
    const wsapp = websockify(app,)
    wsapp.ws.use(wsRouter.routes())
    wsapp.ws.use(wsRouter.allowedMethods())
    return wsapp
}