<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="message" @to-parent="recvFromChild">
    <template v-slot:user_slot="slotProps"
      >这边是 {{ slotProps.user }}!</template
    >
  </HelloWorld>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent, ref } from "vue";
interface Evt {
  msg: string;
}
export default defineComponent({
  name: "app",
  components: {
    HelloWorld,
  },
  setup() {
    const message = ref("hsz");
    const recvFromChild = function (evt: Evt) {
      alert(evt.msg);
    };
    return {
      message,
      recvFromChild,
    };
  },
});
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
