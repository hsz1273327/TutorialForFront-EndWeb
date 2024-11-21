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
var _DEFAULT_VOICE_KEY = "default_voice";
function main(el) {
    return __awaiter(this, void 0, void 0, function () {
        var voices, DefaultVoiceInStorage, default_voice, table, caption, thead, Cols, _i, _a, coltxt, newCell, _loop_1, _b, voices_1, voice;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, chrome.tts.getVoices()];
                case 1:
                    voices = (_c.sent()).sort(function (a, b) { return a.lang.localeCompare(b.lang); });
                    return [4, chrome.storage.local.get(_DEFAULT_VOICE_KEY)];
                case 2:
                    DefaultVoiceInStorage = _c.sent();
                    default_voice = DefaultVoiceInStorage[_DEFAULT_VOICE_KEY];
                    table = document.createElement("table");
                    caption = table.createCaption();
                    caption.innerText = "声音列表";
                    thead = table.createTHead();
                    Cols = thead.insertRow();
                    for (_i = 0, _a = ["voiceName", "lang"]; _i < _a.length; _i++) {
                        coltxt = _a[_i];
                        newCell = Cols.insertCell();
                        newCell.innerText = coltxt;
                    }
                    _loop_1 = function (voice) {
                        var newRow = table.insertRow();
                        var rowcontent = [voice.voiceName, voice.lang];
                        if (default_voice && default_voice == voice.voiceName) {
                            newRow.style.backgroundColor = "yellow";
                        }
                        newRow.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4, chrome.storage.local.set((_a = {}, _a[_DEFAULT_VOICE_KEY] = voice.voiceName, _a))];
                                    case 1:
                                        _b.sent();
                                        newRow.style.backgroundColor = "yellow";
                                        return [2];
                                }
                            });
                        }); });
                        for (var _d = 0, rowcontent_1 = rowcontent; _d < rowcontent_1.length; _d++) {
                            var content = rowcontent_1[_d];
                            var newCell = newRow.insertCell();
                            newCell.innerText = content;
                        }
                    };
                    for (_b = 0, voices_1 = voices; _b < voices_1.length; _b++) {
                        voice = voices_1[_b];
                        _loop_1(voice);
                    }
                    el.appendChild(table);
                    return [2];
            }
        });
    });
}
var popup_div = document.getElementById('popup_div');
if (popup_div) {
    main(popup_div);
}
//# sourceMappingURL=popup.js.map