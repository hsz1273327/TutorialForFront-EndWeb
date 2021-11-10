<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld
    :msg="message"
    @to-parent="recvFromChild"
    v-model:childMsg="child_msg"
  >
    <template v-slot:user_slot="slotProps"
      >这边是 {{ slotProps.user }}!</template
    >
  </HelloWorld>
  <p>foo: {{ foo }}</p>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { defineComponent, ref, watch, provide, readonly } from "vue";
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
    const child_msg = ref("");
    watch(child_msg, (val, oldVal) => {
      alert(`子组件改变了父组件 child_msg:${val}`);
    });
    const foo = ref("foo");
    const updateFoo = (value: string) => (foo.value = value);
    provide("foo", readonly(foo));
    provide("updateFoo", updateFoo);
    return {
      message,
      child_msg,
      recvFromChild,
      foo,
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
