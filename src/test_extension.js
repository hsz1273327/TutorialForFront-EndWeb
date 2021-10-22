const test_ext = (author) => async (ctx, next) => {
    console.log(author)
    await next()
    let content = JSON.parse(ctx.body)
    content = Object.assign(content, {
        "author": author
    })
    ctx.body = JSON.stringify(content)
    console.log(author)
}

export default test_ext