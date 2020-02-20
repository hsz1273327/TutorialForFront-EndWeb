<template>
  <div class="about">
    <h1>about {{ foo }}</h1>
    <h1>This is an about page</h1>
    <p>I'm {{ user }} !</p>
    <a v-bind:href="url">baidu...</a>

    <table border="1">
      <caption>我的好友</caption>
      <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>电话</th>
      </tr>
      <template v-for="(friend, index) in friends">
        <tr :key="index">
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
        <input type="radio" name="gender" id="male" value="male" v-model="friend_gender" checked />
        <label for="male">male</label>
        <br />
        <input type="radio" name="gemder" id="female" value="female" v-model="friend_gender" />
        <label for="female">female</label>
        <br />
        <input type="button" value="Submit" @click="SaveToFriendsList" />
      </fieldset>
    </form>
  </div>
</template>
<script>
export default {
  inject: ['foo'],
  data: function() {
    return {
      user: "hsz",
      url: "http://www.baidu.com",
      friend_name: null,
      friend_gender: null,
      friend_phone: null,
      friends: [
        {
          name: "hzj",
          gender: "male",
          phone: 123454
        },
        {
          name: "tangqi",
          gender: "male",
          phone: 128454
        },
        {
          name: "zhengyufan",
          gender: "male",
          phone: 163454
        },
        {
          name: "yaolili",
          gender: "female",
          phone: 123444
        }
      ]
    };
  },
  methods: {
    SaveToFriendsList: function() {
      let newfriend = {
        name: this.friend_name,
        gender: this.friend_gender,
        phone: this.friend_phone
      };
      this.friends.push(newfriend);
      this.friend_name = null;
      this.friend_gender = null;
      this.friend_phone = null;
    }
  },
  watch: {
    friends: function(val, oldVal) {
      let newfriend = val[val.length - 1];
      if (Notification.permission === "granted") {
        console.log("用户允许通知");
        let notification = new Notification("新增用户", { body: newfriend });
      } else {
        console.log("用户还没选择，去向用户申请权限吧");
        let newname = newfriend.name;
        alert(`新增用户${newname}`);
      }
    }
  },
  updated: function() {
    let now_len = this.friends.length;
    console.log(`共有用户${now_len}人`);
  }
};
</script>