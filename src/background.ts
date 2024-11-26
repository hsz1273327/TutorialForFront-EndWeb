const DEFAULT_VOICE_KEY = "default_voice"

async function speak(msg_to_speak: string, voice_name?: string) {
    try {
        if (voice_name) {
            await chrome.tts.speak(msg_to_speak, { voiceName: voice_name })
        } else {
            await chrome.tts.speak(msg_to_speak)
        }
    } catch (error) {
        if (typeof error === "string") {
            const notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "speak失败",
                "message": error,
                "contextMessage": "error"
            }
            await chrome.notifications.create(notification)
        } else if (error instanceof Error) {
            const notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "speak失败",
                "message": error.message,
                "contextMessage": "error"
            }
            await chrome.notifications.create(notification)
        } else {
            const notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "speak失败",
                "message": "未知类型错误",
                "contextMessage": "error"
            }
            await chrome.notifications.create(notification)
        }
    }
}
// 阅读文本
async function speakOmnibox(msg: string): Promise<void> {
    console.log("speakOmnibox start")
    let msg_to_speak = msg
    // 获取默认声音
    const DefaultVoiceInStorage = await chrome.storage.local.get(DEFAULT_VOICE_KEY)
    let voice_name: string | undefined = DefaultVoiceInStorage[DEFAULT_VOICE_KEY]
    if (msg.includes("@@")) {
        let msg_to_speak_info = msg.split("@@")
        if (msg_to_speak_info.length != 2) {
            const notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "语法解析出错",
                "message": "@@指定声音语法有误",
            }
            await chrome.notifications.create(notification)
        }
        msg_to_speak = msg_to_speak_info[0]
        voice_name = msg_to_speak_info[1]
    }
    await speak(msg_to_speak, voice_name)
}

chrome.omnibox.setDefaultSuggestion(
    {
        description: 'send message to speak.'
    }
)
chrome.omnibox.onInputEntered.addListener(speakOmnibox)


chrome.contextMenus.create({
    'type': 'normal',
    'title': '读出来',
    'contexts': ['selection'],
    'id': 'speak'
})

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (item: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => {
    const tld = item.menuItemId
    if (tld == "speak") {
        // 获取默认声音
        const DefaultVoiceInStorage = await chrome.storage.local.get(DEFAULT_VOICE_KEY)
        let voice_name: string | undefined = DefaultVoiceInStorage[DEFAULT_VOICE_KEY]
        await speak(item.selectionText, voice_name)
    }
})

chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command: ${command}`)
    if (command == "run-speak") {
        const [tab]= await chrome.tabs.query({ active: true, lastFocusedWindow: true })
        console.log(`Command: ${command} tabid: ${tab.id}`)
        const message = await chrome.tabs.sendMessage(tab.id, "speak")
        const DefaultVoiceInStorage = await chrome.storage.local.get(DEFAULT_VOICE_KEY)
        let voice_name: string | undefined = DefaultVoiceInStorage[DEFAULT_VOICE_KEY]
        if (message){
            await speak(message, voice_name)
        }
    }
})
