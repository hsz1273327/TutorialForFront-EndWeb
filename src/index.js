
let ImgRender = {
    status: false,
    render: function (){
        let image = document.createElement("img")
        if (this.status === true) {
            image.setAttribute("src","heart.png")
            this.status = false
        } else{
            image.setAttribute("src","heart-fill.png")
            this.status = true
        }
        let try_but = document.getElementById("try")
        try_but.replaceChild(image,try_but.childNodes[0])
    }

}

let main = () => {
    let try_but = document.getElementById("try")
    try_but.onclick = ImgRender.render
}
main()