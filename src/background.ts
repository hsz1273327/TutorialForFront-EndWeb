function gotoSinaFinance(symbol: string) {
    console.log(`get symbol ${symbol}`)
    window.open(`https://finance.sina.com.cn/realstock/company/${symbol}/nc.shtml`)
}

chrome.omnibox.setDefaultSuggestion(
    {
        description: 'Find current stock information.'
    }
)
chrome.omnibox.onInputEntered.addListener(gotoSinaFinance)
