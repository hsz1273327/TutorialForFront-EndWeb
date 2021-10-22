import redis from "redis"

const pubsub = {
    client:null,
    channel:null,
    events:[],
    init(redis_url,channel){
        this.client = redis.createClient(redis_url)
        this.channel = channel
    },
    pub(msg){
        this.client.publish(msg)
    },
    pubjson(msg){
        this.client.publish(JSON.stringify(msg))
    },
    regist(event,callback){
        this.events.push({
            event:event,
            callback:callback
        })
    },
    sub(){
        for (let {event,callback} of this.events){
            this.client.on(event,callback)
        }
        this.client.subscribe(this.channel)
    }
}

export default pubsub