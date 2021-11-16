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
import { ref } from "vue";
import { DefaultHeros, HeroInterface } from "../const";
import {
  ElCol,
  ElRow,
  ElCard,
} from "element-plus";
const heros = ref(
  Object.assign(
    [],
    DefaultHeros.sort(
      (a: HeroInterface, b: HeroInterface) => b.score - a.score
    ).slice(0, 4)
  )
);
</script>
