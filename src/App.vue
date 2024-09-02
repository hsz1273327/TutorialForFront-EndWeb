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
              class="el-menu-demo"
              mode="horizontal"
              router
            >
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

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useHeroStore } from './stores/herolist'
const store = useHeroStore()
const { SyncHeros } = store
onMounted(SyncHeros)
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
