import connection from '../../model/index.js'
import { pub } from '../../pubsub.js'

const HeroProfile = {
    async get(ctx) {
        let id = parseInt(ctx.params.id)
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄信息",
            }
        }
        try {
            let result = await connection.get_table("Hero").findByPk(id)
            if (result) {
                ctx.body = JSON.stringify(Object.assign(res, {
                    "result": result
                }))
            } else {
                ctx.response.status = 404
                ctx.body = JSON.stringify({
                    "msg": "404 user not found"
                })
            }
        } catch (error) {
            ctx.response.status = 500
            console.log(error)
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    },
    async put(ctx) {
        let id = parseInt(ctx.params.id)
        let pre_ins = ctx.request.body
        try {
            let result = await connection.get_table("Hero").findByPk(id)
            result = await result.update(
                pre_ins
            )
            let heroInfo = result.dataValues
            let hero = {
                id: heroInfo.id,
                name: heroInfo.name,
                score: heroInfo.score
            }
            pub.pubjson({ event: "update", hero:hero})
            ctx.body = JSON.stringify({
                "result": "done"
            })
        } catch (error) {
            ctx.response.status = 500
            console.log(error)
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    },
    async delete(ctx) {
        let id = parseInt(ctx.params.id)
        try {
            let result = await connection.get_table("Hero").findByPk(id)
            await result.destroy()
            pub.pubjson({ event: "delete", hero: { id: id } })
            ctx.body = JSON.stringify({
                "result": "done"
            })
        } catch (error) {
            ctx.response.status = 500
            console.log(error)
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    }
}
export default HeroProfile