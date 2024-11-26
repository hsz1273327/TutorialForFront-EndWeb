chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    console.log(`get cmd ${request}`)
    if (request === "speak") {
        let selection = window.getSelection();
        console.log(`get message ${selection.toString()}`)
        console.log(`get message ${selection.toString()}`)
        sendResponse(selection.toString())
    }
})
