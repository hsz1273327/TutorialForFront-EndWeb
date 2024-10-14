function gotoSinaFinance(symbol) {
    console.log("get symbol ".concat(symbol));
    window.open("https://finance.sina.com.cn/realstock/company/".concat(symbol, "/nc.shtml"));
}
chrome.omnibox.setDefaultSuggestion({
    description: 'Find current stock information.'
});
chrome.omnibox.onInputEntered.addListener(gotoSinaFinance);
//# sourceMappingURL=background.js.map