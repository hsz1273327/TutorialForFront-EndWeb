import * as assert from 'assert'
import { add, Child } from '../src/index'
describe('add', function () {
    it('should return -1 when the value is 0,-1', function () {
        assert.equal(add(0, -1), -1)
    })
})

describe('child', function () {
    it('should return -1 when the value is 0,-1', function () {
        let tom = new Child("tom", 8)
        assert.equal(tom.self_introduction(), "hello my name is tom, I'm 8 years old")
    })
})