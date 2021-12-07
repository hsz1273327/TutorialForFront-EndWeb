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
              router
              @select="changeIndex"
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
        <router-view v-slot="{ Component }">
          <transition name="component-fade" mode="out-in">
            <keep-alive :max="3">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
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
import { ElNotification } from "element-plus";
import { h } from "vue";
import { onUnmounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
store.dispatch("menu/loadCurrrentIndex");
const activeIndex = computed(() => store.getters["menu/activeIndex"]);
const changeIndex = (index: string) => {
  store.dispatch("menu/changeCurrrentIndex", {
    current_index: index,
  });
};
store.dispatch("herolist/SyncHerosBySSE"); //<-debug
store.dispatch("herolist/SyncHeros");
const task = setInterval(
  () =>
    store
      .dispatch("herolist/SyncHeros")
      .then(() => {
        if (!store.getters["herolist/networkStatus"]) {
          ElNotification({
            title: "Title",
            message: h("i", { style: "color: teal" }, "网络已联通"),
          });
          store.commit("herolist/switchNetworkStatus");
        }
      })
      .catch((err) => {
        if (store.getters["herolist/networkStatus"]) {
          ElNotification({
            title: "Title",
            message: h("i", { style: "color: teal" }, "网络问题未能同步数据"),
          });
          store.commit("herolist/switchNetworkStatus");
        }
      }),
  2000
);

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
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
