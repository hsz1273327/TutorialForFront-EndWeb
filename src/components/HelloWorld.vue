<template>
  <div class="hello">
    <h1>hello {{ msg }}</h1>
    <p>Welcome to Your Vue.js + TypeScript App</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
});
</script>
<script setup lang="ts">
const props = defineProps<{
  msg: string;
}>();
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
