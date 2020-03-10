let listFormRender = {
    list: document.getElementById("container"),
    target_list: document.getElementById("target_container"),
    bindEvent: function () {
        this.list.ondragstart = this.onDragStart
        this.target_list.ondrop = this.onDrop
        this.target_list.ondragover = this.onDragover
        console.log("bind")
    },
    onDragStart: function (event) {
        event.dataTransfer.setData("TS", event.target.id)
    },
    onDrop: function (event) {
        event.preventDefault()
        let data = event.dataTransfer.getData("TS")
        let item = document.getElementById(data)
        event.target.appendChild()
        item.setAttribute("draggable",false)

    },
    onDragover: function (event) {
        event.preventDefault()
    }
}

let main = () => {
    console.log("main")
    listFormRender.bindEvent()
}
main()