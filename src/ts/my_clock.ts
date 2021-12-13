let my_clock = (el:HTMLElement)=>{
    let today=new Date()
    let h=today.getHours()
    let m=today.getMinutes()
    let s=today.getSeconds()

    let hours = h.toString()
    let minutes = m>=10?m.toString():('0'+m.toString())
    let secondes = s>=10?s.toString():('0'+s.toString())
    el.innerHTML = h+":"+m+":"+s
    setTimeout(()=>my_clock(el), 1000)
}

let clock_div = document.getElementById('clock_div')
my_clock(clock_div)
