chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(`get cmd ${request}`)
    if (request === "speak") {
        let selection = window.getSelection();
        console.log(`get message ${selection.toString()}`)
        console.log(`get message ${selection.toString()}`)
        sendResponse(selection.toString())
    }
})