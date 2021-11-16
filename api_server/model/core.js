import Sequelize from 'sequelize'

const Heros = [ {
    name: "隐者之紫",
    score: 50,//30+20
    quality: {
        "破坏力": 20,
        "速度": 20,
        "射程距离": 20,
        "持久力": 80,
        "精密度": 20,
        "成长性": 20,
    }
},
{
    name: "红色魔术师",
    score: 75,//43+32
    quality: {
        "破坏力": 60,
        "速度": 40,
        "射程距离": 40,
        "持久力": 40,
        "精密度": 40,
        "成长性": 40,
    }
},
{
    name: "白金之星",
    score: 160,//77+83
    quality: {
        "破坏力": 100,
        "速度": 100,
        "射程距离": 20,
        "持久力": 80,
        "精密度": 100,
        "成长性": 60,
    }
},
{
    name: "法皇",
    score: 75,//53+32
    quality: {
        "破坏力": 60,
        "速度": 60,
        "射程距离": 40,
        "持久力": 80,
        "精密度": 40,
        "成长性": 40,
    }
},
{
    name: "银色战场",
    score: 70,//60+10
    quality: {
        "破坏力": 60,
        "速度": 80,
        "射程距离": 20,
        "持久力": 80,
        "精密度": 60,
        "成长性": 60,
    }
},]
export class Connection {
    constructor () {
        this.TABLES = new Map()
        this.db = null
        this.callbacks = []
    }
    run_callback () {
        if (this.callbacks.length > 0) {
            for (let callback of this.callbacks) {
                callback(this.db)
            }
            this.callbacks = []
        }
    }

    init_url (url, options = {}) {
        this.db = new Sequelize(url, options)
        this.run_callback()
        return this.db
    }

    add_callback (func) {
        this.callbacks.push(func)
    }

    register (Model) {
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
    get_table (db_name) {
        return this.TABLES.get(db_name)
    }

    create_tables (safe = true) {
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
    drop_table (table_name = null) {
        if (table_name) {
            this.TABLES.get(table_name).sync()
        } else {
            for (let [ _, table ] of this.TABLES.entries()) {
                table.sync()
            }
        }
    }
    async mokeHero () {
        if (this.get_table("Hero")) {
            return await this.get_table("Hero").bulkCreate(Heros)
        } else {
            throw "table Hero not registed"
        }
    }
    mokeHeroSync () {
        if (this.get_table("Hero")) {
            let Model = this.get_table("Hero")
            Model.findAll().then(heros => {
                if (heros.length == 0) {
                    Model.bulkCreate(Heros).then(heros => {
                        console.log('{"msg":"table have moke data"}')
                    })
                } else {
                    console.log('{"msg":"table already have data"}')
                }
            })
        } else {
            throw "table Hero not registed"
        }
    }
}
const connection = new Connection()

export default connection