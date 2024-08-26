<template>
  <div class="hello">
    <h1>hello {{ msg }}</h1>
    <slot :user="user" name="user_slot"> 默认的插槽数据 </slot>
    <p>Welcome to Your Vue.js + TypeScript App</p>
    <TestComponents foo="bar"></TestComponents>
    <input type="button" value="Send message" @click="sendToParent" />
    <br />
    <input :value="childMsg" @change="$emit('update:childMsg', $event.target.value)" />
    <br />
    填入foo
    <input :value="foo" @change="updateFoo($event.target.value)" />
    <a v-bind:href="url"> to {{ host }}</a>
    <table border="1">
      <caption>
        我的好友
      </caption>
      <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>电话</th>
      </tr>
      <template v-for="(friend, index) in friends" :key="index">
        <tr>
          <td>{{ friend.name }}</td>
          <td>{{ friend.gender }}</td>
          <td>{{ friend.phone }}</td>
        </tr>
      </template>
    </table>
    <form>
      <fieldset>
        <legend>Friend Info</legend>
        <p>
          Name:
          <input type="text" name="name" v-model="friend_name" />
        </p>
        <p>
          Phone:
          <input type="tel" name="phone" v-model="friend_phone" />
        </p>
        <p>Gender:</p>
        <input type="radio" name="gender" id="male" value="male" v-model="friend_gender" checked /><label
          for="male">male</label>
        <br />
        <input type="radio" name="gender" id="female" value="female" v-model="friend_gender" />
        <label for="female">female</label>
        <br />
        <input type="button" value="Submit" @click="SaveToFriendsList" />
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, computed, watch, inject, defineProps, defineModel, getCurrentInstance } from "vue"
import { debounce } from "lodash-es"

interface Person {
  name: string | null;
  gender: string | null;
  phone: number | null;
}
interface Props {
  msg?: string;
  // childMsg?: string;
}
const props = withDefaults(defineProps<Props>(), {
  msg: "vue",
})
const url = ref("http://www.baidu.com");
const host = computed(() =>
  url.value.replaceAll("http://", "").replaceAll("https://", "")
)
const friend_name = ref<string>("");
watch(friend_name, (val, oldVal) => {
  if (oldVal != "") {
    alert("拼错了?");
  }
})
const friend_gender = ref<string>("male");
const friend_phone = ref<number>(0);
const friends = ref<Person[]>([
  {
    name: "joker",
    gender: "male",
    phone: 123454,
  },
  {
    name: "king",
    gender: "male",
    phone: 128454,
  },
  {
    name: "queen",
    gender: "male",
    phone: 163454,
  },
  {
    name: "knight",
    gender: "female",
    phone: 123444,
  },
])

function _SaveToFriendsList() {
  let newfriend: Person = {
    name: friend_name.value,
    gender: friend_gender.value,
    phone: friend_phone.value,
  };
  friends.value.push(newfriend);
  friend_name.value = "";
  friend_gender.value = "male";
  friend_phone.value = 0;
}

const SaveToFriendsList = debounce(_SaveToFriendsList, 500);
onUnmounted(() => SaveToFriendsList.cancel());
const user = ref("hsz");
defineExpose({
  host,
  friends,
})
const childMsg = defineModel({ type: String })
// const emit = defineEmits(["toParent", "update:childMsg"])
function sendToParent() {
  // emit("toParent", { msg: "1234" })
  childMsg.value = "1234"
}


const foo = inject("foo")
const updateFoo = inject("updateFoo")
const myvueplugin = inject("myvueplugin")
console.log(` myvueplugin inject: ${JSON.stringify(myvueplugin)}`)
const { proxy } = getCurrentInstance()
const myvuepluginfuncreturn = proxy.$myvuepluginfunc()
console.log(`myvuepluginfuncreturn get result: ${myvuepluginfuncreturn}`)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>