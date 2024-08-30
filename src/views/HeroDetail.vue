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
            <span>ID:{{ hero.id }}</span>
          </div>
        </template>
        <div>
          名字：
          <el-input v-model="hero.name" :placeholder="hero.name"></el-input>
          <el-button type="primary" round @click="submitHero">提交</el-button>
        </div>
      </el-card>
      <v-chart class="chart" :option="option" style="height: 400px" />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { DefaultHeros } from "../const";


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

const option = computed(() => {
  const heroattrs = [
    "破坏力",
    "速度",
    "射程距离",
    "持久力",
    "精密度",
    "成长性",
  ];
  return {
    // title: {
    //   text: "英雄属性",
    // },
    // legend: {
    //   data: [hero.value.name],
    // },
    radar: {
      // shape: 'circle',
      indicator: heroattrs.map((i) => ({ name: i, max: 100 })),
    },
    series: [
      {
        name: "英雄属性",
        type: "radar",
        data: [
          {
            value: heroattrs.map((i) => Reflect.get(hero.value.quality, i)),
            name: hero.value.name,
            label: {
              show: true,
              formatter: (params: any) => params.value,
            },
          },
        ],
      },
    ],
  };
});
</script>