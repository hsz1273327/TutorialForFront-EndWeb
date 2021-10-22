import assert from 'assert'
import axios from 'axios'
describe('#Api_helloworld',function(){
    it("should get Hello World",async function(){
        let result = await axios.get("http://localhost:3000")
        assert.equal(result.data.message,'Hello World')
    })
})
