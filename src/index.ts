const promises:Array<Promise<number>> = [
    new Promise<number>((resolve:(value:number)=>void,reject) => resolve(1)),
    new Promise<number>((resolve:(value:number)=>void,reject) => resolve(2)),
    new Promise<number>((resolve:(value:number)=>void,reject) => resolve(3))
]

async function test(hello: string):Promise<void> {
    for await (const p of promises) {
        console.log(`${hello},${p}`)
    }
}
test("hello")