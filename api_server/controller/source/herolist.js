import connection from '../../model/index.js'
import { pub } from '../../pubsub.js'
const HeroList = {
    async get(ctx) {
        let find_par = {
            attributes: ['id', 'name', 'score'],
            order: [['updatedAt', 'DESC']],
        }
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄列表,按更新时间倒序",
            }
        }
        try {
            let result = await connection.get_table("Hero").findAll(find_par)
            res = Object.assign(res, {
                "result": result
            })
            ctx.body = JSON.stringify(res)
        } catch (error) {
            ctx.log.error(error)
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error",
            })
        }
    },
    async post(ctx) {
        let pre_ins = ctx.request.body
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄列表,按更新时间倒序",
            }
        }
        if (pre_ins === null) {
            ctx.throw(400, JSON.stringify({ "msg": "request can not be empty" }))
        } else {
            try {
                let name = pre_ins.name
                delete pre_ins.name
                let [hero, created] = await connection.get_table("Hero").findOrCreate(
                    {
                        where: { name },
                        defaults: { ...pre_ins }
                    }
                )
                if (created) {
                    ctx.response.status = 200
                    res = Object.assign(res, {
                        "msg": "hero created",
                        "data": hero.dataValues
                    })

                    pub.pubjson({
                        event: "create",
                        hero: {
                            id: hero.dataValues.id,
                            name: hero.dataValues.name,
                            score: hero.dataValues.score
                        }
                    })
                    ctx.body = JSON.stringify(res)
                } else {
                    ctx.response.status = 200
                    res = Object.assign(res, {
                        "msg": "hero already exists",
                        "data": hero.dataValues
                    })
                    ctx.body = JSON.stringify(res)
                }
            } catch (error) {
                ctx.log.error(error)
                ctx.response.status = 500
                ctx.body = JSON.stringify({
                    "msg": "500 db error",
                    "error": error
                })
            }
        }
    }
}
export default HeroList