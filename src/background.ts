interface AlarmInfo {
    message: string
    alarminfo: chrome.alarms.AlarmCreateInfo
    create_time: number
}
const ALARMS_STORAGE_KEY = "my-alarms"
let NotifyAlarmMap = new Map<string, string>()
function isInteger(str: string): boolean {
    return /^\d+$/.test(str);
}
// 解析定时字符串
function alarmstrParser(alarmstr: string): AlarmInfo {
    if (!alarmstr.includes("@")) {
        throw "语法错误:必须使用@when或@delay指定闹钟时间"
    }
    const create_time = Date.now()
    let [message, alarminfostr] = alarmstr.split("@")
    let attimestr: string
    let periodInMinutes: number = 1
    if (alarminfostr.includes("#")) {
        const timelist = alarminfostr.split("#")
        attimestr = timelist[0]
        const periodInMinutesstr = timelist[1]
        if (!isInteger(periodInMinutesstr)) {
            throw "语法错误:重复间隔部分不为整数"
        }
        periodInMinutes = Number(periodInMinutesstr)
    } else {
        attimestr = alarminfostr
    }
    if (attimestr.startsWith("when ")) {
        const whenstr = attimestr.replace("when ", "")
        if (!isInteger(whenstr)) {
            throw "语法错误:定时部分不为整数"
        }
        const when = Number(whenstr)
        if (Date.now() <= when) {
            throw "语法错误:定时部分早于当前时间"
        }
        const alarminfo = {
            periodInMinutes,
            when,
        }
        return {
            message,
            alarminfo,
            create_time
        }
    } else if (attimestr.startsWith("delay ")) {
        const delaystr = attimestr.replace("delay ", "")
        if (!isInteger(delaystr)) {
            throw "语法错误:延迟分钟部分不为整数"
        }
        const delayInMinutes = Number(delaystr)
        const alarminfo = {
            periodInMinutes,
            delayInMinutes
        }
        return {
            message,
            alarminfo,
            create_time
        }
    } else {
        throw `语法错误:无法解析定时字符串${attimestr}`
    }
}
async function deleteAlarmInStorage(alarmName: string) {
    const historyAlarmsInStorage = await chrome.storage.local.get(ALARMS_STORAGE_KEY)
    let alarms: Array<AlarmInfo> = historyAlarmsInStorage[ALARMS_STORAGE_KEY]
    let newalarms: Array<AlarmInfo> = []
    if (alarms && alarms.length > 0) {
        for (let alarminfo of alarms) {
            if (alarminfo.message !== alarmName) {
                newalarms.push(alarminfo)
            }
        }
    }
    await chrome.storage.local.set({
        [ALARMS_STORAGE_KEY]: newalarms
    })
}


// 检查已经保存的闹钟并根据现在的时间情况进行恢复
async function checkAlarmState() {
    console.log("checkAlarmState start")
    const historyAlarmsInStorage = await chrome.storage.local.get(ALARMS_STORAGE_KEY);
    const alarms: Array<AlarmInfo> = historyAlarmsInStorage[ALARMS_STORAGE_KEY]
    // let alarmsLeft: Array<AlarmInfo> = []
    if (alarms && alarms.length > 0) {
        for (let alarminfo of alarms) {
            const alarm = await chrome.alarms.get(alarminfo.message);
            let when: number
            if (!alarm) {
                if ("when" in alarminfo.alarminfo) {
                    when = alarminfo.alarminfo.when
                } else {
                    when = alarminfo.create_time + 60 * 1000 * alarminfo.alarminfo.delayInMinutes
                }
                if (when > Date.now()) {
                    await chrome.alarms.create(alarminfo.message, { when: when, periodInMinutes: alarminfo.alarminfo.periodInMinutes })
                } else {
                    await chrome.alarms.create(alarminfo.message, { delayInMinutes: 0.5, periodInMinutes: alarminfo.alarminfo.periodInMinutes })
                }
            }
        }
    }
    console.log("checkAlarmState done")
}


// 设置新的闹钟
async function setAlarm(alarmstr: string): Promise<void> {
    console.log("setAlarm start")
    let notification: chrome.notifications.NotificationOptions<true>
    try {
        const alarminfo = alarmstrParser(alarmstr)
        console.log("setAlarm get alarminfo")
        const historyAlarmsInStorage = await chrome.storage.local.get(ALARMS_STORAGE_KEY);
        let alarms: Array<AlarmInfo> = historyAlarmsInStorage[ALARMS_STORAGE_KEY]
        if (alarms) {
            alarms.push(alarminfo)
        } else {
            alarms = [alarminfo]
        }
        await chrome.storage.local.set({
            [ALARMS_STORAGE_KEY]: alarms
        })
        console.log("setAlarm set alarm in storage ok")
        await chrome.alarms.create(alarminfo.message, alarminfo.alarminfo)
        console.log("setAlarm set alarm ok")
        notification = {
            "iconUrl": '../images/icon128.png',
            "type": "basic" as chrome.notifications.TemplateType,
            "title": "设置闹钟成功",
            "message": alarmstr,
            "contextMessage": "ok"
        }
        console.log("setAlarm set ok")
    } catch (error) {
        if (typeof error === "string") {
            notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "设置闹钟失败",
                "message": error,
                "contextMessage": "error"
            }
        } else if (error instanceof Error) {
            notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "设置闹钟失败",
                "message": error.message,
                "contextMessage": "error"
            }
        } else {
            notification = {
                "iconUrl": '../images/icon128.png',
                "type": "basic" as chrome.notifications.TemplateType,
                "title": "设置闹钟失败",
                "message": "未知类型错误",
                "contextMessage": "error"
            }
        }
        console.log("setAlarm set get error")
    }
    const notificationId = await chrome.notifications.create(notification)
    console.log(`setAlarm throw notification with id ${notificationId}`)
}
// 当闹钟触发时弹出消息
function alarmNotify(alarm: chrome.alarms.Alarm) {
    console.log(`alarmNotify get alarm ${alarm.name}`)
    // notification的另一种写法
    chrome.notifications.create(
        {
            "iconUrl": '../images/icon128.png',
            "type": "basic" as chrome.notifications.TemplateType,
            "title": "闹钟提醒",
            "message": alarm.name,
            "contextMessage": "ok"
        },
        (notificationId: string) => {
            NotifyAlarmMap.set(notificationId, alarm.name)
            console.log(`alarmNotify set alarm ${alarm.name} map to notification ${notificationId} ok`)
        }
    )

}
//当用户手动关闭提醒时清除闹钟
async function clearAlarms(notificationId: string, byUser: boolean) {
    console.log(`clearAlarms start`)
    if (byUser && NotifyAlarmMap.has(notificationId)) {
        const alarmname = NotifyAlarmMap.get(notificationId)
        await deleteAlarmInStorage(alarmname)
        const ok = await chrome.alarms.clear(alarmname)
        console.log(`clear alarm ${alarmname} ${ok}`)
    }
}
checkAlarmState()

chrome.omnibox.setDefaultSuggestion(
    {
        description: 'set a alarm with Special syntax.'
    }
)
chrome.omnibox.onInputEntered.addListener(setAlarm)

chrome.alarms.onAlarm.addListener(alarmNotify)

chrome.notifications.onClosed.addListener(clearAlarms)