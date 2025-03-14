# 实现模型和prompt模板配置功能

我们在popup页面中实现配置功能.chrome插件通常页面不会太复杂,我们应该挑选依赖小更容易拆分的组件库使用,这里使用的是`naive-ui`.

```bash
npm i -D naive-ui
npm i -D vfonts
```

这个项目我希望可以在firefox中也能使用,因此我们安装`webextension-polyfill`以提供通用性

```bash
npm install webextension-polyfill
npm install --save-dev @types/webextension-polyfill
```

所有的配置其实就3项

+ 选模型
+ 写system prompt
+ 写user prompt的模板

前一项我们需要请求ollama的接口,以获取当前系统中所有能用的大模型名,用户选好后存入本地storage;而后两个我们都只要先检查本地storage中是否有保存,没有就将默认的存进去,然后用户自己可以改就好了

## 选模型

选模型涉及两部分数据--可用模型列表和历史已选模型,对于可用模型,我们需要访问外部ollama的接口.ollama提供了列出模型的接口`https://github.com/ollama/ollama/blob/main/docs/api.md#list-local-models`.我们在渲染时将数据拉下来就行了;而对于已选模型,我们则需要借助`chrome.storage`--将已选的模型保存到特定的key中,如果key中没有数据则展示`选择模型`字样.

```vue
<template>
  <n-flex vertical>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-button>{{ chosen_model }}</n-button>
    </n-dropdown>
    ...
  </n-flex>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'
import { NButton, NFlex, NDropdown, type DropdownOption } from 'naive-ui'
import browser from "webextension-polyfill";

const CHOSEN_MODEL_KEY = "chosen_model"
...
interface Info {
  name: string
}
const options: Ref<DropdownOption[]> = ref([])
const chosen_model = ref("选择模型")
...
async function handleSelect(key: string) {
  chosen_model.value = key
  await saveChosenModel(chosen_model.value)
}
...
// 保存选中模型到storage
async function saveChosenModel(value: string) {
  await browser.storage.local.set({ [CHOSEN_MODEL_KEY]: value })
}
// 从storage中获取历史选中模型
async function getChosenModel() {
  const ChosenModelInStorage = await browser.storage.local.get(CHOSEN_MODEL_KEY)
  let _chosen_model = ChosenModelInStorage[CHOSEN_MODEL_KEY] as string | undefined
  if (_chosen_model) {
    chosen_model.value = _chosen_model
  }
}
// 从ollama服务中获取可选模型
async function getOllamaModels() {
  const res = await fetch("http://localhost:11434/api/tags")
  if (res.status !== 200) {
    console.error("Failed to fetch models")
    return
  }
  const data = await res.json()
  let _options: DropdownOption[] = []
  data["models"].forEach((info: Info) => {
    _options.push({ label: info["name"], key: info["name"] })
  })
  options.value = _options
}
...
onBeforeMount(() => {
  Promise.all([
    getOllamaModels(),
    getChosenModel(),
    ...
  ]).then(() => {
    console.log("All models fetched");
  });
})
</script>
```

这一步由于涉及到请求域外api,和storage的应用我们还需要在manifest中进行额外声明

+ `manifest.json`

    ```json
    {
        "permissions": [
            "storage",
            ...
        ],
        ...
        "host_permissions": [
            "http://localhost:11434/*"
        ],
    }
    ```

同时ollama也需要进行额外配置,让其接受跨域请求

```toml
[Service]
...
Environment="OLLAMA_ORIGINS=*"
```

## 编辑系统信息和命令模板

和保存历史选中模型逻辑类似,我们也将对应数据存在对应key里,但多一个初始化操作--如果key不存在我们就把默认系统信息和默认命令模板预填充进去.

```vue
<template>
  <n-flex vertical>
   ...
    <n-divider />
    system:
    <n-input type="textarea" v-model:value="system_prompt" :autosize="{
      minRows: 3,
    }" />
    <n-button @click="save_system_prompt">保存</n-button>
    <n-divider />
    template:
    <n-input type="textarea" v-model:value="prompt_template" :autosize="{
      minRows: 3,
    }" />
    ps: 请使用`{content}`来替换输入的内容
    <n-button @click="save_prompt_template">保存</n-button>
  </n-flex>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'
import { NInput, NDivider, NButton, NFlex } from 'naive-ui'
import browser from "webextension-polyfill";

...
const SYSTEM_PROMPT_KEY = "system_prompt"
const PROMPT_TEMPLATE_KEY = "prompt_template"

...
const system_prompt = ref("")
const prompt_template = ref("")


async function save_system_prompt() {
  await saveSystemPrompt(system_prompt.value)

}
async function save_prompt_template() {
  await savePromptTemplate(prompt_template.value)

}
...
async function saveSystemPrompt(value: string) {
  await browser.storage.local.set({ [SYSTEM_PROMPT_KEY]: value })
}
async function getSystemPrompt() {
  const SystemPromptInStorage = await browser.storage.local.get(SYSTEM_PROMPT_KEY)
  let _systemprompt = SystemPromptInStorage[SYSTEM_PROMPT_KEY] as string | undefined
  if (_systemprompt) {
    system_prompt.value = _systemprompt
  } else {
    system_prompt.value = `## Role: 翻译人员 
 ## Profile: 
 - author: 黄思喆
 - version: 0.1 
 - language: 中文 
 - description: 我是一个优秀的翻译人员，可以将汉字翻译成英文和日语，并提供日语假名。输出结束后，会增加一个横线。 
 ## Goals: 
 将用户输入的文字翻译成中文
 ## Constrains: 
 除非不认识否则不提供任何额外解释说明 
 ## Skills: 
 熟练掌握汉语、英语,法语和日语，熟悉日语假名 

 ## Initialization: 
 欢迎用户, 提示用户输入内容`
  }
  await saveSystemPrompt(system_prompt.value)
}

async function savePromptTemplate(value: string) {
  await browser.storage.local.set({ [PROMPT_TEMPLATE_KEY]: value })
}
async function getPromptTemplate() {
  const PromptTemplateInStorage = await browser.storage.local.get(PROMPT_TEMPLATE_KEY)
  let _prompt_template = PromptTemplateInStorage[PROMPT_TEMPLATE_KEY] as string | undefined
  if (_prompt_template) {
    prompt_template.value = _prompt_template
  } else {
    prompt_template.value = `请将下面的文本翻译为中文:
    "{content}"
    直接给出答案不要说废话`
    await savePromptTemplate(prompt_template.value)
  }
}

onBeforeMount(() => {
  Promise.all([
    getPromptTemplate(),
    getSystemPrompt(),
    ...
  ]).then(() => {
    console.log("All models fetched");
  });
})
</script>
```