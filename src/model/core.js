import Sequelize from 'sequelize'

export class Connection {
    constructor() {
        this.TABLES = new Map()
        this.db = null
        this.callbacks = []
    }
    run_callback() {
        if (this.callbacks.length > 0) {
            for (let callback of this.callbacks) {
                callback(this.db)
            }
            this.callbacks = []
        }
    }

    init_url(url, options = {}) {
        this.db = new Sequelize(url, options)
        this.run_callback()
        return this.db
    }

    add_callback(func) {
        this.callbacks.push(func)
    }

    register(Model) {
        const name = Model.name
        const schema = Model.schema
        const meta = Model.meta
        if (this.db) {
            this.TABLES.set(name, this.db.define(name, schema, meta))
        } else {
            let TABLES = this.TABLES
            this.add_callback(
                function (db) {
                    TABLES.set(name, db.define(name, schema, meta))
                }
            )
            if (this.db) {
                run_callback()
            }
        }
    }
    get_table(db_name) {
        return this.TABLES.get(db_name)
    }

    create_tables(safe = true) {
        if (safe) {
            return this.db.sync({
                force: false
            })
        } else {
            return this.db.sync({
                force: true
            })
        }
    }
    drop_table(table_name = null) {
        if (table_name) {
            this.TABLES.get(table_name).sync()
        } else {
            for (let [_, table] of this.TABLES.entries()) {
                table.sync()
            }
        }
    }
    async moke_data() {
        if (this.get_table("Notification")) {
            return await this.get_table("Notification").bulkCreate([{
                "creater_id": 1,
                "notify_time": new Date(2019, 3, 20, 3, 24, 0),
                "notify_target": [1, 2],
                "message": "msg1"
            }, {
                "creater_id": 3,
                "notify_time": new Date(2019, 3, 20, 3, 25, 0),
                "notify_target": [1, 2],
                "message": "msg2"
            }, {
                "creater_id": 2,
                "notify_time": new Date(2019, 3, 20, 3, 26, 0),
                "notify_target": [1, 2],
                "message": "msg3"
            }, {
                "creater_id": 6,
                "notify_time": new Date(2019, 3, 20, 3, 27, 0),
                "notify_target": [1, 2],
                "message": "msg4"
            }])
        } else {
            throw "table user not registed"
        }
    }
    moke_dataSync() {
        if (this.get_table("Notification")) {
            let Model = this.get_table("Notification")
            Model.findAll().then(users => {
                if (users.length == 0) {
                    Model.bulkCreate([{
                        "creater_id": 1,
                        "notify_time": new Date(2019, 3, 20, 3, 24, 0),
                        "notify_target": [1, 2],
                        "message": "msg1"
                    }, {
                        "creater_id": 3,
                        "notify_time": new Date(2019, 3, 20, 3, 25, 0),
                        "notify_target": [1, 2],
                        "message": "msg2"
                    }, {
                        "creater_id": 2,
                        "notify_time": new Date(2019, 3, 20, 3, 26, 0),
                        "notify_target": [1, 2],
                        "message": "msg3"
                    }, {
                        "creater_id": 6,
                        "notify_time": new Date(2019, 3, 20, 3, 27, 0),
                        "notify_target": [1, 2],
                        "message": "msg4"
                    }]).then(users => {
                        console.log('{"msg":"table have moke data"}')
                    })
                } else {
                    console.log('{"msg":"table already have data"}')
                }
            })
        } else {
            throw "table user not registed"
        }
    }
}
const connection = new Connection()

export default connection