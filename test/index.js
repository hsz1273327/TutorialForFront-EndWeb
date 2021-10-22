import assert from 'assert'
import axios from 'axios'
describe('#Api_main', function () {
    it("should get main", async function () {
        let result = await axios.get("http://localhost:5000")
        
        assert.equal(result.data.self.description, '提供提醒的服务资源')
    })
})
describe('#Api_notification_list', function () {
    it("should get notification_list", async function () {
        let result = await axios.get("http://localhost:5000/notification")
        
        assert.equal(result.data.self.description, '提醒列表,可以使用limit,offset,order,sortby,creater_id,creater_time_from,creater_time_to来进行查找排序')
        assert.equal(result.data.result.length>3,true)
    })
    it("should get notification_list by id", async function () {
        let result = await axios.get("http://localhost:5000/notification?creater_id=2")
        
        assert.equal(result.data.result.length, 1)
    })
    it("should post notification_list", async function () {
        let notify_time = new Date(2019, 3, 20, 4, 27, 0)

        let result = await axios.post("http://localhost:5000/notification", {
            "creater_id": 6,
            "notify_time": notify_time.getTime(),
            "notify_target": [1, 2],
            "message": "testtest"
        })
        
        assert.equal(result.data.result.message, "testtest")
    })
})

describe('#Api_notification', function () {
    it("should get notification 1", async function () {
        let result = await axios.get("http://localhost:5000/notification/1")
        assert.equal(result.data.self.description, '提醒实例,可以使用delete方法删除已有实例')
        assert.equal(result.data.result.id,1)
    })
   
    it("should delete notification 3", async function () {
    
        let result = await axios.delete("http://localhost:5000/notification/3")
        console.log(result.data.result)
        assert.equal(result.data.result, "done")
    })
})