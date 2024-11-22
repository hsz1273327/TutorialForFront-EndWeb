chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("get cmd ".concat(request));
    if (request === "speak") {
        var selection = window.getSelection();
        console.log("get message ".concat(selection.toString()));
        console.log("get message ".concat(selection.toString()));
        sendResponse(selection.toString());
    }
});
//# sourceMappingURL=content.js.map