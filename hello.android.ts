declare const my: any

export class MyHello {
    private helloKotlin: any
    constructor() {
        this.helloKotlin = new my.example.HelloKotlin()
    }
    get hello() {
        return this.helloKotlin.hello
    }
    add(x: number, y: number) {
        return this.helloKotlin.add(x,y)
    }
}
