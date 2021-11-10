<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld
    :msg="message"
    @to-parent="recvFromChild"
    v-model:childMsg="child_msg"
    ><template v-slot:user_slot="slotProps"
      >这边是 {{ slotProps.user }}!</template
    ></HelloWorld
  >
  <p>foo: {{ foo }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
interface Evt {
  msg: string;
}
export default defineComponent({
  name: "app",
  components: {
    HelloWorld,
  },
  provide() {
    return {
      foo: computed(() => this.foo),
      updateFoo: (value: string) => {
        this.foo = value;
      },
    };
  },
  data() {
    return {
      message: "hsz",
      child_msg: "",
      foo: "foo",
    };
  },
  methods: {
    recvFromChild(evt: Evt) {
      alert(evt.msg);
    },
  },
  watch: {
    child_msg: function (val, oldVal) {
      alert(`子组件改变了父组件 child_msg:${val}`);
    },
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
