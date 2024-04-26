<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Button text="parse googlemap url" @tap="onParseURL" />
                    <Button text="parse markdown" @tap="onParseMarkdown" />
                    <Button text="messagepack check" @tap="onMsgPackCheck" />
                    <Button text="yaml check" @tap="onYamlCheck" />
                    <Button text="jsonschema check" @tap="onJsonSchemaCheck" />
                    <Button text="calcul check" @tap="onCalculCheck" />
                    <Button text="Crypto check" @tap="onCryptoCheck" />
                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData } from "@nativescript/core"
import { alert } from "@nativescript/core/ui/dialogs"
import * as urlparse from 'url-parse'
import * as msgpack from "@ygoe/msgpack"
import * as yaml from 'js-yaml'
import { Validator } from '@cfworker/json-schema';
import markdownit from 'markdown-it'
// import "nativescript-nodeify"
import * as nj from '../numjs.min.js'
import CryptoES from 'crypto-es'

async function onParseURL(evt: EventData) {
    const ul = "https://maps.google.com/maps?q=31.207149,121.593086(%E9%87%91%E7%A7%91%E8%B7%AF)&z=17&hl=en"
    const url = urlparse(ul, true)
    const msg = `url parsed as ${JSON.stringify(url, null, 2)}`
    console.log(msg)
    await alert("parse url ok")
}

async function onParseMarkdown(evt: EventData) {
    const mdcontent = '# markdown-it rulezz!'
    const md = markdownit()
    const result = md.render(mdcontent)
    console.log(result)
    await alert("parse markdown ok")
}

async function onMsgPackCheck(evt: EventData) {
    const sourceData = {
        number: 123,
        number2: -0.129,
        text: "Abc with Üñıçôðé and ユニコード",
        flag: true,
        list: [1, 2, 3],
        obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
        time: Date.now()
    }

    const bytes = msgpack.serialize(sourceData)

    const deserializedData = msgpack.deserialize(bytes)

    const msg = `msgpack deserializedData ${JSON.stringify(deserializedData, null, 2)}`
    console.log(msg)
    await alert("msgpack check ok")
}

async function onYamlCheck(evt: EventData) {
    const sourceData = {
        number: 123,
        number2: -0.129,
        text: "Abc with Üñıçôðé and ユニコード",
        flag: true,
        list: [1, 2, 3],
        obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
        time: Date.now()
    }
    const conf = yaml.dump(sourceData, {
        'sortKeys': true        // sort object keys
    })
    const deserializedData = yaml.load(conf)
    const msg = `yaml deserializedData ${JSON.stringify(deserializedData, null, 2)}`
    console.log(msg)
    await alert("yaml check ok")
}

async function onJsonSchemaCheck(evt: EventData) {
    const schema = {
        type: 'object',
        required: ['name', 'email', 'number', 'bool'],
        properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            number: { type: 'number' },
            bool: { type: 'boolean' }
        }
    };
    const draft = '2019-09';
    const shortCircuit = false;
    const validator = new Validator(schema, draft, shortCircuit);

    //错误的数据
    // const result = validator.validate({
    //     name: 'hello',
    //     email: 5, // invalid type
    //     number: 'Hello', // invalid type
    //     bool: 'false' // invalid type
    // })
    //正确的数据
    const result = validator.validate({
        name: 'hello',
        email: "12345@gmail.com", // invalid type
        number: 12, // invalid type
        bool: false // invalid type
    })

    if (result.valid) {
        await alert("jsonschema check ok")
    } else {
        const msg = `jsonschema check has error ${JSON.stringify(result.errors, null, 2)}`
        console.log(msg)
        await alert("jsonschema check has error")
    }
}
async function onCalculCheck(evt: EventData) {
    const a = nj.random([4, 3])
    const b = nj.dot(a, a.T)
    const msg = `Calcul Check get result with shape ${b.shape}`
    console.log(msg)
    await alert("Calcul Check ok")

}
async function onCryptoCheck(evt: EventData) {
    const encrypted = CryptoES.AES.encrypt("Message", "Secret Passphrase");
    console.log(`get message's aes encrypted message ${encrypted}`)
    const decrypted = CryptoES.AES.decrypt(encrypted, "Secret Passphrase");
    if (decrypted.toString(CryptoES.enc.Utf8) == "Message") {
        await alert("Uuid Check ok")
    } else {
        console.log(`get decrypted message ${decrypted}`)
        await alert("Uuid Check not match")
    }
}

</script>