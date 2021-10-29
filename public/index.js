"use strict"

let url = 'http://localhost:4000/test'
let footer = document.createElement("footer")
let button = document.querySelector("main button")

async function get_profiles (url) {
    let response = await fetch(url, { "mode": "no-cors" })
    if (response.status === 200) {
        return await response.json()
    } else {
        throw `http error: ${ response.status }`
    }
}

async function render () {
    try {
        let profile = await get_profiles(url)
        let greeting = document.createElement('p')
        greeting.textContent = profile.message
        footer.appendChild(greeting)
    } catch (e) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = e
        footer.appendChild(errorMessage)
    } finally {
        document.querySelector("#root").appendChild(footer)
    }
}

button.onclick = () => render()