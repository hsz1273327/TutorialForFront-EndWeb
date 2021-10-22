import connection from '../../model/index.js'
import pubsub from '../../pubsub.js'
import {
    change_status
} from './utils'


const NotificationList = {
    timers: new Map(),
    create_find_par(ctx) {
        let findpar = {}
        if (ctx.query.limit) {
            findpar = Object.assign(findpar, {
                limit: ctx.query.limit
            })
        }
        if (ctx.query.offset) {
            findpar = Object.assign(findpar, {
                offset: ctx.query.offset
            })
        }
        if (ctx.query.sortby) {
            if (ctx.query.order) {
                findpar = Object.assign(findpar, {
                    order: [ctx.query.sortby, ctx.query.order]
                })
            } else {
                findpar = Object.assign(findpar, {
                    order: [ctx.query.sortby, 'DESC']
                })
            }
        }
        if (ctx.query.creater_id || ctx.query.creater_time_from || ctx.query.creater_time_to) {
            let querypar = {}
            if (ctx.query.creater_id) {
                querypar = Object.assign(querypar, {
                    creater_id: ctx.query.creater_id
                })
            }
            if (ctx.query.creater_time_from || ctx.query.creater_time_to) {
                let create_time = {}
                if (ctx.query.creater_time_from) {
                    create_time = Object.assign(create_time, {
                        [Op.gt]: new Date(ctx.query.creater_time_from)
                    })
                }
                if (ctx.query.creater_time_to) {
                    create_time = Object.assign(create_time, {
                        [Op.lt]: new Date(ctx.query.creater_time_to)
                    })
                }
                querypar = Object.assign(querypar, {
                    create_time: create_time
                })
            }
            findpar = Object.assign(findpar, {
                where: querypar
            })
        }
        return findpar
    },
    create_timer(notification_id, notify_time) {
        let nt = new Date(notify_time)
        let now = new Date()
        let wait = now.getTime() - nt.getTime()
        let task = NotificationList.task
        NotificationList.timers.set(notification_id, setTimeout(() => task(notification_id), wait))
    },
    task(notification_id) {
        connection.get_table("Notification").findByPk(notification_id).then(notification => {
            let msg = {
                "id": notification.id,
                "message": notification.message,
                "notify_target": notification.notify_target
            }
            //pubsub.pubjson(msg)
            let next_status = "Sent"
            let save_obj = change_status(notification, next_status)
            return notification.save(save_obj)
        }).then(() => {})
    },
    async get(ctx) {
        let findpar = {
            attributes: ['id', 'creater_id', 'create_time', 'message']
        }
        let res = {
            "self": {
                "source": ctx.url,
                "description": "提醒列表,可以使用limit,offset,order,sortby,creater_id,creater_time_from,creater_time_to来进行查找排序",
            }
        }
        if (ctx.query === null) {
            try {
                let result = await connection.get_table("Notification").findAll(find_par)
                res = Object.assign(res, {
                    "result": result
                })
                ctx.body = JSON.stringify(res)
            } catch (error) {
                console.log(error)
                ctx.response.status = 500
                ctx.body = JSON.stringify({
                    "msg": "500 db error",
                })
            }
        } else {
            let temp = NotificationList.create_find_par(ctx)
            findpar = Object.assign(findpar,temp)
            console.log(findpar)
            try {
                let result = await connection.get_table("Notification").findAll(
                    findpar
                )
                res = Object.assign(res, {
                    "result": result
                })
                ctx.body = JSON.stringify(res)
            } catch (error) {
                console.log(error)
                ctx.response.status = 500
                ctx.body = JSON.stringify({
                    "msg": "500 db error",
                })
            }
        }
    },
    async post(ctx) {
        let pre_ins = ctx.request.body
        if (pre_ins === null) {
            ctx.throw(400, JSON.stringify({"msg":"request can not be empty"}))
        } else {
            try {
                let ins = {
                    "creater_id": pre_ins.creater_id,
                    "notify_time": new Date(pre_ins.notify_time),
                    "notify_target": pre_ins.notify_target,
                    "message": pre_ins.message
                }
                let result = await connection.get_table("Notification").create(ins)
                NotificationList.create_timer(result.id, ins.notify_time)
                ctx.body = JSON.stringify({
                    "result": result
                })
            } catch (error) {
                console.log(error)
                ctx.response.status = 500
                ctx.body = {
                    "msg": "500 db error"
                }
            }
        }
    }
}
export default NotificationList