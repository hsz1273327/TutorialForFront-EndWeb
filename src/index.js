const add = (a, b) => a + b

class Child {
    constructor (name, age) {
        this.name = name
        this.age = age
    }
    self_introduction () {
        return `hello my name is ${ this.name }, I'm ${ this.age } years old`
    }
}

export { add, Child }