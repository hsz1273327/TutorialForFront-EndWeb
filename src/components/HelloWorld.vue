<template>
  <div class="hello">
    <h1>hello {{ msg }}</h1>
    <slot :user="user" name="user_slot"> 默认的插槽数据 </slot>
    <p>Welcome to Your Vue.js + TypeScript App</p>
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
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          v-model="friend_gender"
          checked
        /><label for="male">male</label>
        <br />
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          v-model="friend_gender"
        />
        <label for="female">female</label>
        <br />
        <input type="button" value="Submit" @click="SaveToFriendsList" />
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onUnmounted,
  computed,
  ComputedRef,
  watch,
} from "vue";
import { debounce } from "lodash-es";
interface Person {
  name: string;
  gender: string;
  phone: number;
}

interface SetupReturn {
  url: Ref<string>;
  user: Ref<string>;
  host: ComputedRef<string>;
  friend_name: Ref<string>;
  friend_gender: Ref<string>;
  friend_phone: Ref<number>;
  friends: Ref<Person[]>;
  SaveToFriendsList: () => void;
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      default: "vue",
    },
  },
  expose: ["friends", "host"],
  setup(): SetupReturn {
    const url = ref("http://www.baidu.com");
    const user = ref("hsz")
    const host = computed(() =>
      url.value.replaceAll("http://", "").replaceAll("https://", "")
    );
    const friend_name = ref<string>("");
    watch(friend_name, (val, oldVal) => {
      if (oldVal != "") {
        alert("拼错了?");
      }
    });
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
    ]);
    const _SaveToFriendsList = () => {
      let newfriend: Person = {
        name: friend_name.value,
        gender: friend_gender.value,
        phone: friend_phone.value,
      };
      friends.value.push(newfriend);
      friend_name.value = "";
      friend_gender.value = "male";
      friend_phone.value = 0;
    };
    const SaveToFriendsList = debounce(_SaveToFriendsList, 500);
    onUnmounted(() => SaveToFriendsList.cancel());
    return {
      url,
      user,
      host,
      friend_name,
      friend_gender,
      friend_phone,
      friends,
      SaveToFriendsList,
    };
  },
});
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