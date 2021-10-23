"use strict"
import { MD5 } from 'https://cdn.jsdelivr.net/npm/crypto-es/lib/md5.js'
import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@latest/dist/dexie.mjs'

const Storage = {
    db: new Dexie("PersonInfoDatabase"),
    init_db: function () {
        this.db.version(1).stores({
            person: "id,firstname,lastname,gender,birthday,email,tel,homepage"
        })
    },
    saveOne: function (md5_id, table) {
        return this.db.transaction('rw', this.db.person, async () => {
            // Make sure we have something in DB:
            table.id = md5_id
            await this.db.person.add(table)
        })
    },
    loadAll: function () {
        return this.db.transaction('rw', this.db.person, async () => {
            if ((await this.db.person.count()) > 0) {
                let result = await this.db.person.toArray()
                return result
            } else {
                return false
            }
        })
    }
}


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
            this_md5 = MD5(JSON.stringify(table))
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
        let tables_promise = Storage.loadAll();
        tables_promise.then(result => {
            if (result) {
                if (showRender.table_body.childNodes.length > 0) {
                    showRender.table_body.innerHTML = "";
                }
                for (let table of result) {
                    let row = showRender.renderRow(table);
                    showRender.table_body.appendChild(row);
                }
            } else {
                alert("no storage at all");
            }
        }).catch(e => {
            alert(e.stack || e);
        });
    }
}

let main = () => {
    console.log("main")
    formRender.bindEvent()
    showRender.bindEvent()
}
main()