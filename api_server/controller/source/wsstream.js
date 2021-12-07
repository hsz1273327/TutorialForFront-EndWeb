import connection from '../../model/index.js'
import { sub } from '../../pubsub.js'

const HeroListWsStream = {
    async get (ctx) {

        // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
        // the websocket is added to the context on `ctx.websocket`.
        let find_par = {
            attributes: [ 'id', 'name', 'score' ],
            order: [ [ 'updatedAt', 'DESC' ] ],
        }
        sub.onMessage = (channel, message) => {
            let data = JSON.parse(message)
            ctx.websocket.send(JSON.stringify({ event: data.event, data: data.hero }))
        }
        sub.options = {
            onSubscribe: function (channel, count) {
                console.log("subscribe # to " + channel + ", " + count + " total subscriptions")
            },
            onUnSubscribe: function (channel, count) {
                console.log("unsubscribe # from " + channel + ", " + count + " total subscriptions")
            }
        }
        try {
            let _data = await connection.get_table("Hero").findAll(find_par)
            let data = _data.map((i) => ({ id: i.id, name: i.name, score: i.score }))
            ctx.websocket.send(JSON.stringify({ event: "sync", data }))
            sub.subscribe()
        } catch (error) {
            ctx.websocket.send(JSON.stringify({
                event: "error",
                data: error
            }))
            ctx.websocket.close()
        }
    }
}
export default HeroListWsStream