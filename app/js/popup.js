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
function main(el) {
    return __awaiter(this, void 0, void 0, function () {
        var table, caption, thead, Cols, _i, _a, coltxt, newCell, number, historySymbolsInStorage, historySymbolsSet, historySymbols, _b, historySymbols_1, symbol, url, res, content, row, time, price, volume, rowcontent, newRow, _c, rowcontent_1, content_1, newCell;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    table = document.createElement("table");
                    caption = table.createCaption();
                    caption.innerText = "分时数据";
                    thead = table.createTHead();
                    Cols = thead.insertRow();
                    for (_i = 0, _a = ["symbol", "time", "price", "volume"]; _i < _a.length; _i++) {
                        coltxt = _a[_i];
                        newCell = Cols.insertCell();
                        newCell.innerText = coltxt;
                    }
                    number = 1;
                    return [4, chrome.storage.local.get("history-symbols")];
                case 1:
                    historySymbolsInStorage = _d.sent();
                    historySymbolsSet = new Set(historySymbolsInStorage["history-symbols"]);
                    historySymbols = Array.from(historySymbolsSet);
                    _b = 0, historySymbols_1 = historySymbols;
                    _d.label = 2;
                case 2:
                    if (!(_b < historySymbols_1.length)) return [3, 6];
                    symbol = historySymbols_1[_b];
                    url = "https://vip.stock.finance.sina.com.cn/quotes_service/view/vML_DataList.php?asc=j&symbol=".concat(symbol, "&num=").concat(number);
                    return [4, fetch(url)];
                case 3:
                    res = _d.sent();
                    return [4, res.text()];
                case 4:
                    content = _d.sent();
                    content = content.replace("var minute_data_list = ", "").replace(/\[/g, "").replace(/\]/g, "").replace(/\;/g, "").replace(/\'/g, "");
                    row = content.split(",");
                    time = row[0];
                    price = row[1];
                    volume = row[2];
                    rowcontent = [symbol, time, price, volume];
                    newRow = table.insertRow();
                    for (_c = 0, rowcontent_1 = rowcontent; _c < rowcontent_1.length; _c++) {
                        content_1 = rowcontent_1[_c];
                        newCell = newRow.insertCell();
                        newCell.innerText = content_1;
                    }
                    _d.label = 5;
                case 5:
                    _b++;
                    return [3, 2];
                case 6:
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