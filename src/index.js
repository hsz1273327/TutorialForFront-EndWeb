const promises = [
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(2)),
    new Promise(resolve => resolve(3))
]

async function test (hello: string) {
    for await (const p of promises) {
        console.log(`${ hello },${ p }`)
    }
}
test("hello")