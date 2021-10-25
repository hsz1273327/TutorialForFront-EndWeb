'use strict'

async function get_profiles (url) {
    let response = await axios.get(url)
    if (response.status === 200) {
        return response.data
    } else {
        throw `http error: ${ response.status }`
    }
}

async function main () {
    let url = 'https://api.github.com/users'
    let footer = document.createElement("footer")
    try {
        let profiles = await get_profiles(url)
        for (let profile of profiles) {
            let greeting = document.createElement('p')
            greeting.textContent = `greeting ${ profile.login }, here is footer!`
            footer.appendChild(greeting)
        }
    } catch (e) {
        let errorMessage = document.createElement('p')
        errorMessage.textContent = e
        footer.appendChild(errorMessage)
    } finally {
        document.querySelector("#root").appendChild(footer)
    }
}

main()