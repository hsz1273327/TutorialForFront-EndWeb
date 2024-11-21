const _DEFAULT_VOICE_KEY = "default_voice"
async function main(el: HTMLElement) {
    // 获取语音列表
    let voices = (await chrome.tts.getVoices()).sort((a, b) => a.lang.localeCompare(b.lang))
    // 获取默认声音
    const DefaultVoiceInStorage = await chrome.storage.local.get(_DEFAULT_VOICE_KEY)
    let default_voice: string | undefined = DefaultVoiceInStorage[_DEFAULT_VOICE_KEY]
    // 渲染列表
    let table = document.createElement("table")
    let caption = table.createCaption()
    caption.innerText = "声音列表"
    let thead = table.createTHead()
    let Cols = thead.insertRow()
    for (let coltxt of ["voiceName", "lang"]) {
        let newCell = Cols.insertCell()
        newCell.innerText = coltxt
    }
    for (let voice of voices) {
        let newRow = table.insertRow()
        const rowcontent = [voice.voiceName, voice.lang]
        if (default_voice && default_voice == voice.voiceName) {
            // rowcontent = [`*${voice.voiceName}`, voice.lang]
            newRow.style.backgroundColor = "yellow"
        }
        newRow.addEventListener("click", async () => {
            await chrome.storage.local.set({ [_DEFAULT_VOICE_KEY]: voice.voiceName })
            newRow.style.backgroundColor = "yellow"
        })
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