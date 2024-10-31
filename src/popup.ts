async function main(el: HTMLElement) {
    let table = document.createElement("table")
    let caption = table.createCaption()
    caption.innerText = "分时数据"
    let thead = table.createTHead()
    let Cols = thead.insertRow()
    for (let coltxt of ["symbol", "time", "price", "volume"]) {
        let newCell = Cols.insertCell() 
        newCell.innerText = coltxt
    }

    const number = 1
    const historySymbolsInStorage = await chrome.storage.local.get("history-symbols")
    let historySymbolsSet: Set<string> = new Set(historySymbolsInStorage["history-symbols"])
    const historySymbols = Array.from(historySymbolsSet)
    for (let symbol of historySymbols) {
        const url = `https://vip.stock.finance.sina.com.cn/quotes_service/view/vML_DataList.php?asc=j&symbol=${symbol}&num=${number}`
        const res = await fetch(url)
        let content = await res.text()
        content = content.replace("var minute_data_list = ", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\;/g, "").replace(/\'/g, "")
        const row = content.split(",")
        const time = row[0]
        const price = row[1]
        const volume = row[2]
        const rowcontent = [symbol, time, price, volume]
        let newRow = table.insertRow()
        for (let content of rowcontent) {
            let newCell = newRow.insertCell()
            newCell.innerText = content
        }
    }
    el.appendChild(table)
}

const popup_div = document.getElementById('popup_div')
if (popup_div) {
    main(popup_div)
}