import connection from '../../model/index.js'
import { sub } from '../../pubsub.js'

const HeroListStream = {
    async get (ctx) {
        ctx.sse.on('close', (...args) => {
            sub.unsubscribe()
        })
        let find_par = {
            attributes: [ 'id', 'name', 'score' ],
            order: [ [ 'updatedAt', 'DESC' ] ],
        }
        sub.onMessage = (channel, message) => {
            let data = JSON.parse(message)
            ctx.sse.send({ event: data.event, data: JSON.stringify(data.hero) })
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
            ctx.sse.send({ event: "sync", data: JSON.stringify(data) })
            sub.subscribe()
        } catch (error) {
            ctx.sse.sendEnd({
                event: "error",
                data: error
            })
        }
    }
}
export default HeroListStream