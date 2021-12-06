import connection from '../../model/index.js'
import {sub} from '../../pubsub.js'

const HeroListStream = {
    async get(ctx) {
        ctx.sse.on('close', (...args) => {
            sub.unsubscribe()
        });
        let find_par = {
            attributes: ['id', 'name', 'score'],
            order: [['updatedAt', 'DESC']],
        }
        sub.onMessage=(channel,message)=>{
            let data = JSON.parse(message)
            ctx.sse.send(JSON.stringify({ : 100, data }))
        }
        sub.options={
            onSubscribe: function(channel, count){
                console.log("subscribe # to " + channel + ", " + count + " total subscriptions");
            },
            onUnSubscribe: function(channel, count){
                console.log("unsubscribe # from " + channel + ", " + count + " total subscriptions");
            }
        }
        try {
            let result = await connection.get_table("Hero").findAll(find_par)
            ctx.sse.send(JSON.stringify({ status: 200, result }))
            sub.subscribe()
        } catch (error) {
            ctx.sse.send(JSON.stringify({
                status: 500,
                result: { "msg": "500 db error" }
            }))
            ctx.sse.sendEnd()
        }
    }
}
export default HeroListStream