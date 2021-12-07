import logger from 'pino'
import cmd from './cmd.js'
import bind_config from './config.js'
import connect from './model/index.js'
import { pub, sub } from './pubsub.js'
import app from './app.js'
import { InitWS } from './wsapp.js'

function main (argv) {
    let config = cmd(argv)(bind_config)
    let log = logger({ level: "info" })
    log.info(config)
    app.config = config
    pub.init(app.config.get("REDIS_URL"), app.config.get("REDIS_CHANNEL"))
    sub.init(app.config.get("REDIS_URL"), app.config.get("REDIS_CHANNEL"))
    connect.init_url(app.config.get("DB_URL"), { logging: log.debug })
    connect.create_tables("Hero", true).then(() => {
        return connect.get_table("Hero").count()
    }).then(count => {
        if (count === 0) {
            return connect.mokeHero()
        } else {
            return false
        }
    }).then(() => {
        let wsapp = InitWS(app)
        log.info(`server start @ ${ app.config.get("HOST") }:${ app.config.get("PORT") }`)
        wsapp.listen(app.config.get("PORT"), app.config.get("HOST"))
    })


}

main(process.argv)