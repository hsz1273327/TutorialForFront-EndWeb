<template>
  <div id="app">
    <el-container>
      <el-header height="120">
        <header>
          <el-row :gutter="10" type="flex" justify="center">
            <h1>英雄指南</h1>
          </el-row>
          <el-row :gutter="10" type="flex" justify="center">
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-menu-item index="/">仪表盘</el-menu-item>
              <el-menu-item index="/herolist">英雄列表</el-menu-item>
              <el-menu-item index="/newhero">创建英雄</el-menu-item>
            </el-menu>
          </el-row>
          <el-divider></el-divider>
        </header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: "app",
};
</script>

<script setup lang="ts">
import {
  ElContainer,
  ElMain,
  ElHeader,
  ElDivider,
  ElRow,
  ElMenu,
  ElMenuItem,
} from "element-plus";
import Dashboard from "./views/Dashboard.vue";
import HeroDetail from "./views/HeroDetail.vue";
import HeroList from "./views/HeroList.vue";
import NewHero from "./views/NewHero.vue";
import { onUnmounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.dispatch("herolist/SyncHeros")
const task = setInterval(() => store.dispatch("herolist/SyncHeros"), 15000);
onUnmounted(() => clearInterval(task));
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
