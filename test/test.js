import assert from 'assert'
import { add, Child } from '../src/index.js'

/** @test {add} */
describe('add', function () {
    it('should return -1 when the value is 0,-1', function () {
        assert.equal(add(0, -1), -1)
    })
})

/** @test {Child} */
describe('child', function () {
    /** @test {Child#self_introduction}*/
    it('should get tom 8', function () {
        let tom = new Child("tom", 8)
        assert.equal(tom.self_introduction(), "hello my name is tom, I'm 8 years old")
    })
})