const proRemoteURL = () => {
    if (process.env.NODE_ENV == 'production') {
        if (window.location.port == "") {
            return `http://${window.location.host}`
        }
        return `http://${window.location.host}:${window.location.port}`
    }
    return "http://localhost:5000"
}

const RemoteURL = proRemoteURL()

export { RemoteURL }