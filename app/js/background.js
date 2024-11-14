var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ALARMS_STORAGE_KEY = "my-alarms";
var NotifyAlarmMap = new Map();
function isInteger(str) {
    return /^\d+$/.test(str);
}
function alarmstrParser(alarmstr) {
    if (!alarmstr.includes("@")) {
        throw "语法错误:必须使用@when或@delay指定闹钟时间";
    }
    var create_time = Date.now();
    var _a = alarmstr.split("@"), message = _a[0], alarminfostr = _a[1];
    var attimestr;
    var periodInMinutes = 1;
    if (alarminfostr.includes("#")) {
        var timelist = alarminfostr.split("#");
        attimestr = timelist[0];
        var periodInMinutesstr = timelist[1];
        if (!isInteger(periodInMinutesstr)) {
            throw "语法错误:重复间隔部分不为整数";
        }
        periodInMinutes = Number(periodInMinutesstr);
    }
    else {
        attimestr = alarminfostr;
    }
    if (attimestr.startsWith("when ")) {
        var whenstr = attimestr.replace("when ", "");
        if (!isInteger(whenstr)) {
            throw "语法错误:定时部分不为整数";
        }
        var when = Number(whenstr);
        if (Date.now() <= when) {
            throw "语法错误:定时部分早于当前时间";
        }
        var alarminfo = {
            periodInMinutes: periodInMinutes,
            when: when,
        };
        return {
            message: message,
            alarminfo: alarminfo,
            create_time: create_time
        };
    }
    else if (attimestr.startsWith("delay ")) {
        var delaystr = attimestr.replace("delay ", "");
        if (!isInteger(delaystr)) {
            throw "语法错误:延迟分钟部分不为整数";
        }
        var delayInMinutes = Number(delaystr);
        var alarminfo = {
            periodInMinutes: periodInMinutes,
            delayInMinutes: delayInMinutes
        };
        return {
            message: message,
            alarminfo: alarminfo,
            create_time: create_time
        };
    }
    else {
        throw "\u8BED\u6CD5\u9519\u8BEF:\u65E0\u6CD5\u89E3\u6790\u5B9A\u65F6\u5B57\u7B26\u4E32".concat(attimestr);
    }
}
function deleteAlarmInStorage(alarmName) {
    return __awaiter(this, void 0, void 0, function () {
        var historyAlarmsInStorage, alarms, newalarms, _i, alarms_1, alarminfo;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, chrome.storage.local.get(ALARMS_STORAGE_KEY)];
                case 1:
                    historyAlarmsInStorage = _b.sent();
                    alarms = historyAlarmsInStorage[ALARMS_STORAGE_KEY];
                    newalarms = [];
                    if (alarms && alarms.length > 0) {
                        for (_i = 0, alarms_1 = alarms; _i < alarms_1.length; _i++) {
                            alarminfo = alarms_1[_i];
                            if (alarminfo.message !== alarmName) {
                                newalarms.push(alarminfo);
                            }
                        }
                    }
                    return [4, chrome.storage.local.set((_a = {},
                            _a[ALARMS_STORAGE_KEY] = newalarms,
                            _a))];
                case 2:
                    _b.sent();
                    return [2];
            }
        });
    });
}
function checkAlarmState() {
    return __awaiter(this, void 0, void 0, function () {
        var historyAlarmsInStorage, alarms, _i, alarms_2, alarminfo, alarm, when;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("checkAlarmState start");
                    return [4, chrome.storage.local.get(ALARMS_STORAGE_KEY)];
                case 1:
                    historyAlarmsInStorage = _a.sent();
                    alarms = historyAlarmsInStorage[ALARMS_STORAGE_KEY];
                    if (!(alarms && alarms.length > 0)) return [3, 8];
                    _i = 0, alarms_2 = alarms;
                    _a.label = 2;
                case 2:
                    if (!(_i < alarms_2.length)) return [3, 8];
                    alarminfo = alarms_2[_i];
                    return [4, chrome.alarms.get(alarminfo.message)];
                case 3:
                    alarm = _a.sent();
                    when = void 0;
                    if (!!alarm) return [3, 7];
                    if ("when" in alarminfo.alarminfo) {
                        when = alarminfo.alarminfo.when;
                    }
                    else {
                        when = alarminfo.create_time + 60 * 1000 * alarminfo.alarminfo.delayInMinutes;
                    }
                    if (!(when > Date.now())) return [3, 5];
                    return [4, chrome.alarms.create(alarminfo.message, { when: when, periodInMinutes: alarminfo.alarminfo.periodInMinutes })];
                case 4:
                    _a.sent();
                    return [3, 7];
                case 5: return [4, chrome.alarms.create(alarminfo.message, { delayInMinutes: 1, periodInMinutes: alarminfo.alarminfo.periodInMinutes })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3, 2];
                case 8:
                    console.log("checkAlarmState done");
                    return [2];
            }
        });
    });
}
function setAlarm(alarmstr) {
    return __awaiter(this, void 0, void 0, function () {
        var notification, alarminfo, historyAlarmsInStorage, alarms, error_1, notificationId;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("setAlarm start");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    alarminfo = alarmstrParser(alarmstr);
                    console.log("setAlarm get alarminfo");
                    return [4, chrome.storage.local.get(ALARMS_STORAGE_KEY)];
                case 2:
                    historyAlarmsInStorage = _b.sent();
                    alarms = historyAlarmsInStorage[ALARMS_STORAGE_KEY];
                    if (alarms) {
                        alarms.push(alarminfo);
                    }
                    else {
                        alarms = [alarminfo];
                    }
                    return [4, chrome.storage.local.set((_a = {},
                            _a[ALARMS_STORAGE_KEY] = alarms,
                            _a))];
                case 3:
                    _b.sent();
                    console.log("setAlarm set alarm in storage ok");
                    return [4, chrome.alarms.create(alarminfo.message, alarminfo.alarminfo)];
                case 4:
                    _b.sent();
                    console.log("setAlarm set alarm ok");
                    notification = {
                        "iconUrl": '../images/icon128.png',
                        "type": "basic",
                        "title": "设置闹钟成功",
                        "message": alarmstr,
                        "contextMessage": "ok"
                    };
                    console.log("setAlarm set ok");
                    return [3, 6];
                case 5:
                    error_1 = _b.sent();
                    if (typeof error_1 === "string") {
                        notification = {
                            "iconUrl": '../images/icon128.png',
                            "type": "basic",
                            "title": "设置闹钟失败",
                            "message": error_1,
                            "contextMessage": "error"
                        };
                    }
                    else if (error_1 instanceof Error) {
                        notification = {
                            "iconUrl": '../images/icon128.png',
                            "type": "basic",
                            "title": "设置闹钟失败",
                            "message": error_1.message,
                            "contextMessage": "error"
                        };
                    }
                    else {
                        notification = {
                            "iconUrl": '../images/icon128.png',
                            "type": "basic",
                            "title": "设置闹钟失败",
                            "message": "未知类型错误",
                            "contextMessage": "error"
                        };
                    }
                    console.log("setAlarm set get error");
                    return [3, 6];
                case 6: return [4, chrome.notifications.create(notification)];
                case 7:
                    notificationId = _b.sent();
                    console.log("setAlarm throw notification with id ".concat(notificationId));
                    return [2];
            }
        });
    });
}
function alarmNotify(alarm) {
    console.log("alarmNotify get alarm ".concat(alarm.name));
    chrome.notifications.create({
        "iconUrl": '../images/icon128.png',
        "type": "basic",
        "title": "闹钟提醒",
        "message": alarm.name,
        "contextMessage": "ok"
    }, function (notificationId) {
        NotifyAlarmMap.set(notificationId, alarm.name);
    });
}
function clearAlarms(notificationId, byUser) {
    return __awaiter(this, void 0, void 0, function () {
        var alarmname, ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("clearAlarms start");
                    if (!(byUser && NotifyAlarmMap.has(notificationId))) return [3, 3];
                    alarmname = NotifyAlarmMap.get(notificationId);
                    return [4, deleteAlarmInStorage(alarmname)];
                case 1:
                    _a.sent();
                    return [4, chrome.alarms.clear(alarmname)];
                case 2:
                    ok = _a.sent();
                    console.log("clear alarm ".concat(alarmname, " ").concat(ok));
                    _a.label = 3;
                case 3: return [2];
            }
        });
    });
}
checkAlarmState();
chrome.omnibox.setDefaultSuggestion({
    description: 'set a alarm with Special syntax.'
});
chrome.omnibox.onInputEntered.addListener(setAlarm);
chrome.alarms.onAlarm.addListener(alarmNotify);
chrome.notifications.onClosed.addListener(clearAlarms);
//# sourceMappingURL=background.js.map