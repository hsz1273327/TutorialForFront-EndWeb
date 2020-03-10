function getLocation() {
    console.log("click")
    let x = document.createElement("p")
    let root = document.getElementById("root")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position){
                x.textContent = `Latitude: ${position.coords.latitude};Longitude: ${position.coords.longitude}`
                let latlon = position.coords.latitude + "," + position.coords.longitude
                let img_url = `http://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&sensor=false`
                let img = document.createElement("div")
                img.innerHTML = `<img src='${img_url}' />`
                root.appendChild(img)
            },
            function (error){
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        x.textContent = "User denied the request for Geolocation."
                        break;
                    case error.POSITION_UNAVAILABLE:
                        x.textContent = "Location information is unavailable."
                        break;
                    case error.TIMEOUT:
                        x.textContent = "The request to get user location timed out."
                        break;
                    case error.UNKNOWN_ERROR:
                        x.textContent= "An unknown error occurred."
                        break;
                }
            }
        )
    } else {
        x.textContent = "Geolocation is not supported by this browser.";
    }
    root.appendChild(x)
    let y = document.createElement("p")
    y.textContent = `电脑屏幕为:${screen.width}x${screen.height};平台为: ${navigator.platform},浏览器为:${navigator.appVersion}`
    root.appendChild(y)
}

let main = () => {
    let try_but = document.getElementById("try")
    try_but.onclick=getLocation
}
main()