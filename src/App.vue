<template>
  <div id="app">
    <el-container>
      <el-header height="120">
        <header>
          <el-row :gutter="10" type="flex" justify="center">
            <h1>英雄指南
              <el-icon>
                <Link v-if="isOnline" />
                <Loading v-else />
              </el-icon>
            </h1>
          </el-row>
          <el-row :gutter="10" type="flex" justify="center">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router
              @select="changeCurrrentIndex">
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
            <keep-alive :max="3" exclude="HeroDetail">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, h } from 'vue'
import { ElNotification } from "element-plus"
import { Link, Loading } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import ReconnectingEventSource from "reconnecting-eventsource"
import { useHeroStore } from './stores/herolist'
import { useMenuStore } from './stores/menu'

const heroStore = useHeroStore()
const { isOnline } = storeToRefs(heroStore)
const { SyncHerosBySSE } = heroStore

const menuStore = useMenuStore()
const { activeIndex } = storeToRefs(menuStore)
const { changeCurrrentIndex, loadCurrrentIndex } = menuStore

watch(isOnline, (newValue: boolean) => {
  if (newValue) {
    ElNotification({
      title: "网络已联通",
      message: h("i", { style: "color: teal" }, "网络已联通"),
    });
  } else {
    ElNotification({
      title: "网络未通",
      message: h("i", { style: "color: teal" }, "网络已断开"),
    });
  }
});

let es:ReconnectingEventSource|null = null

onMounted(() => {
  loadCurrrentIndex()
  es = SyncHerosBySSE()
})
onUnmounted(()=>{
  if (es){
    es.close()
    console.log("es close ok")
  }
})
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
