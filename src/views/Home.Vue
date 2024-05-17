<template>
    <Frame>
        <Page actionBarHidden="true">
            <StackLayout>
                <Button text="测试源码扩展" @tap="onActionTap1" />
                <Button text="测试lib扩展" @tap="onActionTap2" />
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts" setup>
import { MyHelloKotlin } from '../wrapper/hello'
import { JSONSchemaValidator } from '../wrapper/jsonschemafriend'

function onActionTap1(evt) {
    const my = new MyHelloKotlin()
    console.log(`my.hello is ${my.hello}`)
    console.log(`my.add(12.5,13.9) is ${my.add(12.5, 13.9)}`)
}
function onActionTap2(evt) {
    const schema = `{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"integer\"}`
    const validator = new JSONSchemaValidator(schema)
    validator.validateJson("1")
    console.log(`validator.validateJson("1") is ${validator.validateJson("1")}`)
    console.log(`validator.validateJson("true") is ${validator.validateJson("true")}`)
}
</script>