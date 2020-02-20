<template>
  <div class="home">
    <h1>home {{ foo }}</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <form>
      <fieldset>
        <legend>send message</legend>
        <p>
          message:
          <input type="text" name="message" v-model="msg" />
        </p>
      </fieldset>
    </form>
    <HelloWorld :msg="msg" @toParent="recvFromChild" v-model="child_msg">
      <template v-slot:user_slot="slotProps">这边是 {{ slotProps.user }}!</template>
    </HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data: function() {
    return {
      msg: undefined,
      child_msg: ""
    };
  },
  inject: ['foo'],
  methods: {
    recvFromChild: function(msg) {
      alert(msg.msg);
    }
  },
  watch: {
    msg: function(val, oldVal) {
      if ((val === null) | (val === "")) {
        this.msg = undefined;
      }
    },
    child_msg: function(val, oldVal) {
      alert(`子组件改变了父组件 child_msg:${val}`);
    }
  },
  components: {
    HelloWorld
  }
};
</script>
