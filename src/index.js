/**
 * @desc 加法操作
 * @access public
 * @param {number} a -加数
 * @param {number} b -被加数
 * @returns {number} 和
 */
const add = (a, b) => a + b

/**
 * @desc Child类
 * @access public
 */
class Child {
    /**
     * @desc 初始化一个Child对象
     * @param {string} name 小朋友名字
     * @param {int} age 小朋友年纪
     */
    constructor (name, age) {
        /**
         * @desc 小朋友名字
         * @type {string}
         */
        this.name = name
        /**
         * @desc 小朋友名字
         * @type {int}
         */
        this.age = age
    }
    /**
     * @desc 自我介绍的文本
     * @returns {string} 自我介绍文本
     */
    self_introduction () {
        return `hello my name is ${ this.name }, I'm ${ this.age } years old`
    }
}

export { add, Child }
