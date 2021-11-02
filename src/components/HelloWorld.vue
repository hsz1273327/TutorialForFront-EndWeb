<template>
  <div class="hello">
    <h1>hello {{ msg }}</h1>
    <p>Welcome to Your Vue.js + TypeScript App</p>
    <a v-bind:href="url">baidu...</a>
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
import { defineComponent } from "vue";

interface Person {
  name: string | null;
  gender: string | null;
  phone: number | null;
}

interface DataReturn {
  url: string;
  friend_name: string | null;
  friend_gender: string | null;
  friend_phone: number | null;
  friends: Person[];
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    SaveToFriendsList: function () {
      let newfriend: Person = {
        name: this.friend_name,
        gender: this.friend_gender,
        phone: this.friend_phone,
      };
      this.friends.push(newfriend);
      this.friend_name = null;
      this.friend_gender = null;
      this.friend_phone = null;
    },
  },
  data(): DataReturn {
    return {
      url: "http://www.baidu.com",
      friend_name: null,
      friend_gender: null,
      friend_phone: null,
      friends: [
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
      ],
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
