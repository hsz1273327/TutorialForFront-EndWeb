import fs from 'fs'
import path from 'path'
import {
    updateMap
} from "./utils.js"
export const DEFAULT_CONFIG = {
    "PORT": 5000,
    "HOST": "0.0.0.0",
    "DB_URL": "postgresql://postgres:postgres@pg/postgres",
    "REDIS_URL": "redis://rds",
    "REDIS_CHANNEL": "test_channel"
}

export function init_config(options) {
    let config = new Map(Object.entries(DEFAULT_CONFIG))
    let defaultconfigPath = path.resolve("./", "config.json")
    if (fs.existsSync(defaultconfigPath)) {
        let temp_config = new Map(Object.entries(JSON.parse(fs.readFileSync(configPath))))
        config = updateMap(config, temp_config)
    } else {
        console.log("default config file not exist")
    }
    if (options.config) {
        if (fs.existsSync(options.config)) {
            let temp_config = new Map(Object.entries(JSON.parse(fs.readFileSync(options.config))))
            config = updateMap(config, temp_config)
        } else {
            throw "config file not exist"
        }
    }
    return config
}
export function bind_config(options) {
    //console.log(options)
    let config = init_config(options)
    if (options.port) {
        config.set("PORT", options.port)
    }
    if (options.host) {
        config.set("HOST", options.host)
    }
    if (options.dburl) {
        config.set("DB_URL", options.dburl)
    }
    if (options.redisurl) {
        config.set("REDIS_URL", options.redisurl)
    }
    if (options.redischannel) {
        config.set("REDIS_CHANNEL", options.redischannel)
    }
    return config
}

export default bind_config