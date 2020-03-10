function isNull(exp){
    return !exp && typeof exp != "undefined" && exp != 0
}

let formRender = {
    last_md5: null,
    target_form:document.getElementById("test_form"),
    bindEvent: function(){
        this.target_form.onsubmit = this.onSubmit
        this.target_form.onreset = this.onReset
        console.log("bind")
    },
    onSubmit: function (){
        let table = {
            gender:formRender.target_form.gender.value,
            firstname:formRender.target_form.firstname.value,
            lastname:formRender.target_form.lastname.value,
            birthday:formRender.target_form.birthday.value,
            email:formRender.target_form.email.value,
            tel:formRender.target_form.tel.value,
            homepage:formRender.target_form.homepage.value
        }
        let this_md5 = md5(JSON.stringify(table))
        if (isNull(formRender.last_md5)){
            formRender.last_md5 = this_md5
            console.log("first table")
            console.log(table)
        } else{
            if (this_md5 !== formRender.last_md5){
                console.log("new table")
                console.log(table)
                formRender.last_md5 = this_md5
            }else{
                console.log("same input")
            }
        }
        return false
    },
    onReset:function (){
        console.log(formRender.last_md5)
        formRender.last_md5 = null
        formRender.target_form.reset()
    }
}

let main = () => {
    console.log("main")
    formRender.bindEvent()
}
main()