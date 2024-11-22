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
var _this = this;
var DEFAULT_VOICE_KEY = "default_voice";
function speak(msg_to_speak, voice_name) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, notification, notification, notification;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 12]);
                    if (!voice_name) return [3, 2];
                    return [4, chrome.tts.speak(msg_to_speak, { voiceName: voice_name })];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2: return [4, chrome.tts.speak(msg_to_speak)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3, 12];
                case 5:
                    error_1 = _a.sent();
                    if (!(typeof error_1 === "string")) return [3, 7];
                    notification = {
                        "iconUrl": '../images/icon128.png',
                        "type": "basic",
                        "title": "speak失败",
                        "message": error_1,
                        "contextMessage": "error"
                    };
                    return [4, chrome.notifications.create(notification)];
                case 6:
                    _a.sent();
                    return [3, 11];
                case 7:
                    if (!(error_1 instanceof Error)) return [3, 9];
                    notification = {
                        "iconUrl": '../images/icon128.png',
                        "type": "basic",
                        "title": "speak失败",
                        "message": error_1.message,
                        "contextMessage": "error"
                    };
                    return [4, chrome.notifications.create(notification)];
                case 8:
                    _a.sent();
                    return [3, 11];
                case 9:
                    notification = {
                        "iconUrl": '../images/icon128.png',
                        "type": "basic",
                        "title": "speak失败",
                        "message": "未知类型错误",
                        "contextMessage": "error"
                    };
                    return [4, chrome.notifications.create(notification)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [3, 12];
                case 12: return [2];
            }
        });
    });
}
function speakOmnibox(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var msg_to_speak, DefaultVoiceInStorage, voice_name, msg_to_speak_info, notification;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("speakOmnibox start");
                    msg_to_speak = msg;
                    return [4, chrome.storage.local.get(DEFAULT_VOICE_KEY)];
                case 1:
                    DefaultVoiceInStorage = _a.sent();
                    voice_name = DefaultVoiceInStorage[DEFAULT_VOICE_KEY];
                    if (!msg.includes("@@")) return [3, 4];
                    msg_to_speak_info = msg.split("@@");
                    if (!(msg_to_speak_info.length != 2)) return [3, 3];
                    notification = {
                        "iconUrl": '../images/icon128.png',
                        "type": "basic",
                        "title": "语法解析出错",
                        "message": "@@指定声音语法有误",
                    };
                    return [4, chrome.notifications.create(notification)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    msg_to_speak = msg_to_speak_info[0];
                    voice_name = msg_to_speak_info[1];
                    _a.label = 4;
                case 4: return [4, speak(msg_to_speak, voice_name)];
                case 5:
                    _a.sent();
                    return [2];
            }
        });
    });
}
chrome.omnibox.setDefaultSuggestion({
    description: 'send message to speak.'
});
chrome.omnibox.onInputEntered.addListener(speakOmnibox);
chrome.contextMenus.create({
    'type': 'normal',
    'title': '读出来',
    'contexts': ['selection'],
    'id': 'speak'
});
chrome.contextMenus.onClicked.addListener(function (item, tab) { return __awaiter(_this, void 0, void 0, function () {
    var tld, DefaultVoiceInStorage, voice_name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tld = item.menuItemId;
                if (!(tld == "speak")) return [3, 3];
                return [4, chrome.storage.local.get(DEFAULT_VOICE_KEY)];
            case 1:
                DefaultVoiceInStorage = _a.sent();
                voice_name = DefaultVoiceInStorage[DEFAULT_VOICE_KEY];
                return [4, speak(item.selectionText, voice_name)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2];
        }
    });
}); });
chrome.commands.onCommand.addListener(function (command) { return __awaiter(_this, void 0, void 0, function () {
    var tab, message, DefaultVoiceInStorage, voice_name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Command: ".concat(command));
                if (!(command == "run-speak")) return [3, 5];
                return [4, chrome.tabs.query({ active: true, lastFocusedWindow: true })];
            case 1:
                tab = (_a.sent())[0];
                console.log("Command: ".concat(command, " tabid: ").concat(tab.id));
                return [4, chrome.tabs.sendMessage(tab.id, "speak")];
            case 2:
                message = _a.sent();
                return [4, chrome.storage.local.get(DEFAULT_VOICE_KEY)];
            case 3:
                DefaultVoiceInStorage = _a.sent();
                voice_name = DefaultVoiceInStorage[DEFAULT_VOICE_KEY];
                if (!message) return [3, 5];
                return [4, speak(message, voice_name)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2];
        }
    });
}); });
//# sourceMappingURL=background.js.map