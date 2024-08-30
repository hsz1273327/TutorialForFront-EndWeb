<template>
  <div class="hero-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/herolist' }">Hero</el-breadcrumb-item>
      <el-breadcrumb-item>profile</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-button
      type="primary"
      icon="el-icon-arrow-left"
      @click="goBack"
      style="float: right"
      >返回</el-button
    >

    <el-row type="flex" justify="center">
      <h1>英雄详情</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="clearfix" v-if="hero">
            <span>{{ hero.id }}</span>
          </div>
        </template>
        <div>
          名字：
          <el-input v-model="hero.name" :placeholder="hero.name"></el-input>
          <el-button type="primary" round @click="submitHero">提交</el-button>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDivider,
  ElRow,
  ElCard,
  ElInput,
  ElButton,
} from "element-plus";
import { DefaultHeros } from "../const";
import { useRouter } from "vue-router";

const router = useRouter();
interface Props {
  id: number;
}
const props = defineProps<Props>();
const _hero = DefaultHeros.filter((ele) => ele.id == props.id);
if (_hero.length != 1) {
  alert(`id ${props.id} not found`);
  throw `id ${props.id} not found`;
}
const hero = ref(_hero[0]);
const submitHero = () => {
  console.log(hero.value);
};
const goBack = () => router.back();
</script>