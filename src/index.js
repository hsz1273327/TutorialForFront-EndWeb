function _render_template() {
    let template = document.querySelector('#test_template')
    let content = document.querySelector('#content').value
    let placehold = template.content.querySelector("#content_placehold")
    placehold.innerText = content
    let now = new Date().toString()
    template.content.querySelector("time").innerText = now
    let rendered_content = document.importNode(template.content, true)
    return rendered_content
}

function _render_dom(rendered_content) {
    let root = document.querySelector('#root')
    let form = document.querySelector('#form')
    root.insertBefore(rendered_content, form)
}

function render() {
    if ('content' in document.createElement('template')) {
        let rendered_content = _render_template()
        _render_dom(rendered_content)
    } else {
        console.log("浏览器不支持模板")
    }

}

let main = () => {
    let try_but = document.getElementById("try")
    try_but.onclick = render
}
main()