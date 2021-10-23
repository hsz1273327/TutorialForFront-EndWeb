"use strict"
import { MD5 } from 'https://cdn.jsdelivr.net/npm/crypto-es/lib/md5.js'

const Storage = {
    saveOne: function (md5_id, table) {
        localStorage.setItem(md5_id, JSON.stringify(table));
    },
    loadAll: function () {
        if (localStorage.length > 0) {
            let keys = Object.keys(localStorage);
            let result = [];
            for (let id of keys) {
                let body = localStorage[id];
                let table = JSON.parse(body);
                table.id = id;
                result.push(table);
            }
            return result;
        } else {
            return false;
        }
    }
};


function isNull (exp) {
    return !exp && typeof exp != "undefined" && exp != 0
}

let formRender = {
    last_md5: null,
    target_form: document.getElementById("test_form"),
    bindEvent: function () {
        this.target_form.onsubmit = this.onSubmit
        this.target_form.onreset = this.onReset
        console.log("bind form")
    },
    onSubmit: function () {
        console.log("fafasf")
        let table = {
            gender: formRender.target_form.gender.value,
            firstname: formRender.target_form.firstname.value,
            lastname: formRender.target_form.lastname.value,
            birthday: formRender.target_form.birthday.value,
            email: formRender.target_form.email.value,
            tel: formRender.target_form.tel.value,
            homepage: formRender.target_form.homepage.value
        }
        let this_md5
        try {
            this_md5 = MD5(JSON.stringify(table)).toString();
        } catch (err) {
            console.log(err)
            return false
        }

        if (isNull(formRender.last_md5)) {
            formRender.last_md5 = this_md5
            console.log("first table")
            Storage.saveOne(this_md5, table)
        } else {
            if (this_md5 !== formRender.last_md5) {
                console.log("new table")
                table
                formRender.last_md5 = this_md5
            } else {
                console.log("same input")
            }
        }
        return false
    },
    onReset: function () {
        formRender.last_md5 = null
        formRender.target_form.reset()
    }
}

let showRender = {
    show_button: document.getElementById("show"),
    table_body: document.getElementById("rows"),
    template: document.querySelector('#table_template'),
    bindEvent: function () {
        this.show_button.onclick = this.onClick
        console.log("bind show")
    },
    renderRow: function (table) {
        let id = showRender.template.content.querySelector(".id")
        id.innerText = table.id
        let gender = showRender.template.content.querySelector(".gender")
        gender.innerText = table.gender
        let firstname = showRender.template.content.querySelector(".firstname")
        firstname.innerText = table.firstname
        let lastname = showRender.template.content.querySelector(".lastname")
        lastname.innerText = table.lastname
        let birthday = showRender.template.content.querySelector(".birthday")
        birthday.innerText = table.birthday
        let email = showRender.template.content.querySelector(".email")
        email.innerText = table.email
        let tel = showRender.template.content.querySelector(".tel")
        tel.innerText = table.tel
        let homepage = showRender.template.content.querySelector(".homepage")
        homepage.innerText = table.homepage
        let rendered_content = document.importNode(showRender.template.content, true)
        return rendered_content
    },
    onClick: function () {
        let tables = Storage.loadAll()
        if (tables) {
            if (showRender.table_body.childNodes.length > 0) {
                showRender.table_body.innerHTML = ""
            }
            for (let table of tables) {
                let row = showRender.renderRow(table)

                showRender.table_body.appendChild(row)
            }
        } else {
            alert("no storage at all")
        }
    }
}

let main = () => {
    console.log("main")
    formRender.bindEvent()
    showRender.bindEvent()
}
main()