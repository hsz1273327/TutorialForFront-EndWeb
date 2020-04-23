import eg_tulip from "./eg_tulip.jpg"


export default function () {
    let greet = document.createElement('div')
    greet.textContent = "greetings!"
    let img = document.createElement("img")
    img.src = eg_tulip
    greet.appendChild(img)
    return greet
}