function my_clock(el: HTMLElement) {
    const today = new Date()
    const h = today.getHours()
    const m = today.getMinutes()
    const s = today.getSeconds()

    const hours = h.toString()
    const minutes = m >= 10 ? m.toString() : ('0' + m.toString())
    const secondes = s >= 10 ? s.toString() : ('0' + s.toString())
    el.innerHTML = h + ":" + m + ":" + s
    setTimeout(() => my_clock(el), 1000)
}

const clock_div = document.getElementById('clock_div')
if (clock_div) {
    my_clock(clock_div)
}

