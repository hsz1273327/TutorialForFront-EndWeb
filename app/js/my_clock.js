var my_clock = function (el) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var hours = h.toString();
    var minutes = m >= 10 ? m.toString() : ('0' + m.toString());
    var secondes = s >= 10 ? s.toString() : ('0' + s.toString());
    el.innerHTML = h + ":" + m + ":" + s;
    setTimeout(function () { return my_clock(el); }, 1000);
};
var clock_div = document.getElementById('clock_div');
my_clock(clock_div);
//# sourceMappingURL=my_clock.js.map