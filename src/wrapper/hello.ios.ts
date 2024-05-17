declare const HelloSwift: any

export class MyHello {
    private helloSwift: any
    constructor() {
        this.helloSwift = new HelloSwift()
    }
    get hello() {
        return this.helloSwift.hello
    }
    add(x: number, y: number) {
        return this.helloSwift.addWithAB(x,y)
    }
}
