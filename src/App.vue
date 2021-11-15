<template>
  <div id="app">
    <el-container>
      <el-header height="120">
        <header>
          <el-row :gutter="10" type="flex" justify="center">
            <h1>英雄指南</h1>
          </el-row>
          <el-row :gutter="10" type="flex" justify="center">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
            >
              <el-menu-item index="1">仪表盘</el-menu-item>
              <el-menu-item index="2">英雄列表</el-menu-item>
            </el-menu>
          </el-row>
          <el-divider></el-divider>
        </header>
      </el-header>
      <el-main>
        <Dashboard></Dashboard>
        <HeroList></HeroList>
        <HeroDetail></HeroDetail>
        <NewHero></NewHero>
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
import { ref } from "vue";
const activeIndex = ref("1");
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
