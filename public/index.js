"use strict"

async function get_profiles (url) {
  let response = await fetch(url)
  return response.json()
}

async function render () {
  let url = 'https://api.github.com/users'
  let profiles = await get_profiles(url)
  let footer = document.createElement("footer")
  for (let profile of profiles) {
    let greeting = document.createElement('p')
    greeting.textContent = `greeting ${ profile.login }, here is footer!`
    footer.appendChild(greeting)
  }
  document.querySelector("#root").appendChild(footer)
}

async function main () {
  if ('serviceWorker' in navigator) {
    try {
      let registration = await navigator.serviceWorker.register('sw.js')
      console.log("Service Worker registered with scope:", registration.scope)
      await render()
    } catch (err) {
      console.log("Service worker registration failed:")
      console.log(err)
    }
  } else {
    await render()
  }

}

main()