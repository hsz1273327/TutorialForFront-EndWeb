
function animation(point,target){
    point.click(function(){
        var i = 0
        while (i<5){
            target.css("color","red")
                .fadeTo("slow",0.15)
                .delay(500)
                .fadeTo("slow",0.85)
                .delay(500)
            i+=1
        }
    })
}
var point = $("#img")
var target = $("#img")
animation(point,target)