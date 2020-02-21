const add = (a: number, b: number): number => a + b

class Child {
    public name: string
    public age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    self_introduction(): string {
        return `hello my name is ${this.name}, I'm ${this.age} years old`
    }
}

export { add, Child }