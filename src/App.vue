<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="message" @to-parent="recvFromChild"
    ><template v-slot:user_slot="slotProps"
      >这边是 {{ slotProps.user }}!</template
    ></HelloWorld
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "app",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
interface Evt {
  msg: string;
}
function recvFromChild(evt: Evt) {
  alert(evt.msg);
}
const message = ref("hsz");
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
