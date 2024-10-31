async function option_main(el: HTMLElement) {
    let form = document.createElement("form")
    // form.setAttribute()

    const historySymbolsInStorage = await chrome.storage.local.get("history-symbols")
    let historySymbolsSet: Set<string> = new Set(historySymbolsInStorage["history-symbols"])
    const historySymbols = Array.from(historySymbolsSet)
    let opts: HTMLInputElement[] = []
    for (let symbol of historySymbols) {
        let div = document.createElement("div")
        let opt = document.createElement("input")
        let label = document.createElement("label")
        opt.type = "checkbox"
        opt.value = symbol
        opt.id = symbol
        label.htmlFor=symbol
        label.textContent = symbol
        div.appendChild(opt)
        div.appendChild(label)
        form.appendChild(div)
        opts.push(opt)
    }
    let submit_button = document.createElement("button")
    submit_button.type = "button"
    submit_button.textContent = "删除"
    submit_button.addEventListener("click", async (evt: MouseEvent) => {
        console.log("clicked**************")
        for (let opt of opts) {
            if (opt.checked) {
                console.log(`${opt.value} checked**************`)
                historySymbolsSet.delete(opt.value)
                opt.disabled = true
            }
        }
        const newhistorySymbols = Array.from(historySymbolsSet)
        await chrome.storage.local.set({
            "history-symbols": newhistorySymbols
        })
        console.log(`set storage ok`)
        const historySymbolsCount = newhistorySymbols.length
        await chrome.action.setBadgeText({ text: `${historySymbolsCount}` })
    })
    form.appendChild(submit_button)
    el.appendChild(form)
}

const options_div = document.getElementById('options_div')
if (options_div) {
    option_main(options_div)
}