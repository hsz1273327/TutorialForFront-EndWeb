
import redis from "redis"

const pub = {
    client: null,
    channel: null,
    init(redis_url, channel) {
        this.client = redis.createClient(redis_url)
        this.channel = channel
    },
    pub(msg) {
        this.client.publish(this.channel, msg)
    },
    pubjson(msg) {
        let msg_s = JSON.stringify(msg)
        this.pub(msg_s)
    },
}


const sub = {
    client: null,
    channel: null,
    onMessage: null,
    options: null,
    init: function (redis_url, channel) {
        this.client = redis.createClient(redis_url)
        this.channel = channel
    },
    subscribe: function () {
        if (this.onMessage) {
            this.client.on("message", this.onMessage)
        }
        if (this.options.onSubscribe) {
            this.client.on("subscribe", this.options.onSubscribe)
        }
        if (this.options.onUnSubscribe) {
            this.client.on("unsubscribe", this.options.onUnSubscribe)
        }
        this.client.subscribe(this.channel)
    },
    unsubscribe: function(){
        this.client.unsubscribe()
    }
}

export { pub, sub }