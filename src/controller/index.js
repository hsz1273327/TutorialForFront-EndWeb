import router from 'koa-route'
import compose from 'koa-compose'
import Main from './source/main.js'
import NotificationList from './source/notification_list.js'
import Notification from './source/notification.js'

let routes = compose([
    router.get('/', Main.get),
    router.get('/notification', NotificationList.get),
    router.post('/notification', NotificationList.post),
    router.get('/notification/:id', Notification.get),
    router.delete('/notification/:id', Notification.delete)
])

export default routes