<template>
  <div class="dashboard">
    <el-row type="flex" justify="center">
      <h2>Top Heros</h2>
    </el-row>
    <el-row :gutter="1" type="flex" justify="space-around">
      <template v-for="item in heros" :key="item.id">
        <el-col :span="4">
          <el-card shadow="hover">{{ item.name }}</el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: "dashboard",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { DefaultHeros, HeroInterface } from "../const";
import { ElCol, ElRow, ElCard } from "element-plus";
const store = useStore();
console.log(Object.keys(store.getters));
const heros = computed(() => store.getters["herolist/top4Heros"]);
console.log(heros.value);
</script>
