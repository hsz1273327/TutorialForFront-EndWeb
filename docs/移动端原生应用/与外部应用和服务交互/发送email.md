# 发送email

官方提供了插件[@nativescript/email](https://docs.nativescript.org/plugins/email)用于调用系统中的默认邮件工具发送邮件.本文例子在[nsv-email分支](https://github.com/hsz1273327/TutorialForFront-EndWeb/tree/nsv-email)

我们可以调用接口`available()=>Promise<boolean>`来判断是否可以发送邮件.如果可以则再使用`compose(options: ComposeOptions)=>Promise<boolean>`来发送email.`ComposeOptions`,满足接口

```ts
interface ComposeOptions {
    /**
     * email的主题.
     */
    subject?: string;

    /**
     * 纯文本或html型email的内容部分
     */
    body?: string;

    /**
     * 发送给的目标地址,注意android中只有第一个会生效
     */
    to?: string[];

    /**
     * 抄送的目标地址,注意android中只有第一个会生效
     */
    cc?: string[];

    /**
     * 私下抄送的目标地址,注意android中只有第一个会生效
     */
    bcc?: string[];

    /**
     * 附件信息
     */
    attachments?: Array<Attachment>;
}

interface Attachment {
    /**
     * 附件文件名.
     * Example:
     *
     *   fileName: 'Cute-Kitten.png'
     */
    fileName: string;

    /**
     * 附件地址,可以是如下情况:
     *
     *   - base64 encoded: 'base64://iVBORw..XYZ'
     *   - 应用本地地址 'file://..
     *   - 设备上绝对地址 'file:///..'
     *   - 也可以直接是path形式 '/some/path/to/file.png'
     */
    path: string;

    /**
     * iOS Only, 指明附件文件类型
     * Example:
     *
     *   mimeType: 'image/png'
     */
    mimeType: string;
}

```

需要注意这个插件在ios模拟器中是无法生效的,要测试得去实机.


## 例子

```vue
<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="Check Can Send Email" @tap="checkEmail" />
                <Button text="Send Email" @tap="sendEmail" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { EventData, } from '@nativescript/core'
import { available, compose } from '@nativescript/email'


async function checkEmail() {
    try {
        let avail = await available()
        console.log('Email available? ' + avail)
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}

async function sendEmail(evt: EventData) {
    try {
        let result = await compose({
            subject: 'Yo',
            body: 'Hello <strong>dude</strong> :)',
            to: ['eddyverbruggen@gmail.com', 'to@person2.com'],
            cc: ['ccperson@somewhere.com'],
            bcc: ['eddy@combidesk.com', 'eddy@x-services.nl'],
            attachments: [
                {
                    fileName: 'arrow1.png',
                    path: 'base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC',
                    mimeType: 'image/png',
                }
            ],
        })
        console.log(`Email composer closed with result ${result}`)
    } catch (error) {
        console.log(`get error ${error.message}`)
    }
}
</script>
```
