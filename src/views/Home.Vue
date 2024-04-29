<template>
    <Frame>
        <Page actionBarHidden="true">
            <ScrollView>
                <StackLayout>
                    <Button text="parse markdown" @tap="onParseMarkdown" />
                    <Button text="messagepack check" @tap="onMsgPackCheck" />
                    <Button text="yaml check" @tap="onYamlCheck" />
                    <Button text="jsonschema check" @tap="onJsonSchemaCheck" />
                    <Button text="calcul check" @tap="onCalculCheck" />
                    <Button text="Crypto check" @tap="onCryptoCheck" />
                    <Button text="parse googlemap url" @tap="onParseURL" />
                    <Button text="gen new uuid" @tap="onGenUUID" />
                    <Button text="decode JWT" @tap="onDecodeJWT" />
                    <Button text="Base64 Check" @tap="onBase64Check" />

                </StackLayout>
            </ScrollView>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData, isAndroid, File, knownFolders, path } from "@nativescript/core"
import { alert } from "@nativescript/core/ui/dialogs"
import * as urlparse from 'url-parse'
import * as msgpack from "@ygoe/msgpack"
import * as yaml from 'js-yaml'
import { Validator } from '@cfworker/json-schema';
import markdownit from 'markdown-it'
// import "nativescript-nodeify"
import * as nj from '../numjs.min.js'
import CryptoES from 'crypto-es'
import * as UUID from "pure-uuid"
import jwtDecode from "jwt-decode"

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
async function onParseURL(evt: EventData) {
    const ul = "https://maps.google.com/maps?q=31.207149,121.593086(%E9%87%91%E7%A7%91%E8%B7%AF)&z=17&hl=en"
    const url = urlparse(ul, true)
    const msg = `url parsed as ${JSON.stringify(url, null, 2)}`
    console.log(msg)
    await alert("parse url ok")
}
async function onGenUUID(evt: EventData) {
    const uuid = new UUID(4); //v4
    console.log(`gen uuid get ${uuid.format("std")}`)
    await alert("Gen UUID ok")
}

async function onDecodeJWT(evt: EventData) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    try {
        const decoded_header = jwtDecode(token, { header: true });
        console.log(`decode jwt header get ${JSON.stringify(decoded_header)}`)
        const decoded = jwtDecode(token);
        console.log(`decode jwt get ${JSON.stringify(decoded)}`)
        await alert("Decode JWT ok")
    } catch (e) {
        console.log(`gen uuid get error ${e.message}`)
    }
}

declare const android: any;
declare const java: any;
declare const NSData: any;
declare const NSUTF8StringEncoding: any;
declare const NSString: any;

function stringToBase64(textString: string): string {
    if (isAndroid) {
        const text = new java.lang.String(textString)
        const data = text.getBytes("UTF-8")
        const base64String = android.util.Base64.encodeToString(data, android.util.Base64.NO_WRAP)
        return base64String
    } else {
        const text = NSString.stringWithString(textString)
        const data = text.dataUsingEncoding(NSUTF8StringEncoding)
        const base64String = data.base64EncodedStringWithOptions(0)
        return base64String
    }
}
async function fileToBase64(filepath: string): Promise<string> {
    const sourceFile = File.fromPath(path.join(knownFolders.currentApp().path, filepath))
    const data = await sourceFile.read();
    if (isAndroid) {
        return android.util.Base64.encodeToString(
            data,
            android.util.Base64.NO_WRAP
        );
    } else {
        return data.base64EncodedStringWithOptions(0);
    }
}

function base64ToString(base64String: string): string {
    if (isAndroid) {
        var data = android.util.Base64.decode(base64String, android.util.Base64.NO_WRAP)
        var decodedString = new java.lang.String(data, java.nio.charset.StandardCharsets.UTF_8)
        return decodedString
    } else {
        const decodedData = NSData.alloc().initWithBase64EncodedStringOptions(base64String, 0)
        const decodedString = NSString.alloc().initWithDataEncoding(decodedData, NSUTF8StringEncoding)
        return decodedString
    }
}


async function base64ToFile(base64String: string, filepath: string): Promise<void> {
    if (isAndroid) {
        const data = android.util.Base64.decode(base64String, android.util.Base64.NO_WRAP)
        const targetFile = File.fromPath(path.join(knownFolders.currentApp().path, filepath))
        await targetFile.write(data);
    } else {
        const data = NSData.alloc().initWithBase64EncodedStringOptions(base64String, 0)
        const targetFile = File.fromPath(path.join(knownFolders.currentApp().path, filepath))
        await targetFile.write(data);
    }
}

async function onBase64Check(evt: EventData) {
    const msg = "a message"
    try {
        const bstr = stringToBase64(msg)
        console.log(`message get base64 string ${bstr}`)
        const bmsg = base64ToString(bstr)
        console.log(` base64 string to message get ${bmsg}`)
        await base64ToFile(bstr, "./mymsg.txt")
        console.log(`base64 to file ok`)
        const fbstr = await fileToBase64("./mymsg.txt")
        const str_match = msg == bmsg ? true : false
        const b64_match = fbstr == bstr ? true : false
        await alert(`Base64Check ok: str match ${str_match};b64 match ${b64_match}`)
    } catch (e) {
        console.log(`Base64Chec get error ${e.message}`)
    }
}


</script>