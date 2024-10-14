async function gotoSinaFinance(symbol: string): Promise<void> {
    await chrome.tabs.create({ url: `https://finance.sina.com.cn/realstock/company/${symbol}/nc.shtml` })
    const historySymbolsInStorage = await chrome.storage.local.get("history-symbols")
    let historySymbolsSet = new Set(historySymbolsInStorage["history-symbols"])
    historySymbolsSet.add(symbol)
    const historySymbols = Array.from(historySymbolsSet)
    await chrome.storage.local.set({
        "history-symbols": historySymbols
    })
    const historySymbolsCount = historySymbols.length
    await chrome.action.setBadgeText({ text: `${historySymbolsCount}` })
}

chrome.omnibox.setDefaultSuggestion(
    {
        description: 'Find current stock information.'
    }
)
chrome.omnibox.onInputEntered.addListener(gotoSinaFinance)
