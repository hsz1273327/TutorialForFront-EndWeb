import connection from '../../model/index.js'
import NotificationList from './notification_list.js'
import {
    change_status
} from './utils'
const Notification = {
    async get(ctx, id) {
        id = parseInt(id)
        let res = {
            "self": {
                "source": ctx.url,
                "description": "提醒实例,可以使用delete方法删除已有实例",
            }
        }
        try {
            let result = await connection.get_table("Notification").findByPk(id)
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
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    },
    async delete(ctx, id) {
        id = parseInt(id)
        try {
            let result = await connection.get_table("Notification").findByPk(id)
            clearTimeout(NotificationList.timers.get(id))
            NotificationList.timers.delete(id)
            let save_obj = change_status(result, "Cancel")
            await result.save(save_obj)
            ctx.body = JSON.stringify({
                "result": "done"
            })
        } catch (error) {
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    }
}

export default Notification