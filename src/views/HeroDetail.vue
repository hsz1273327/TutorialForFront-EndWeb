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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeroDetail",
});
</script>
<script setup lang="ts">
import { ref, provide, computed, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDivider,
  ElRow,
  ElCol,
  ElCard,
  ElInput,
  ElButton,
} from "element-plus";
import { THEME_KEY } from "vue-echarts";
import { HeroInterface } from "../const";

const store = useStore();
const router = useRouter();
interface Props {
  id: number;
}
const props = defineProps<Props>();
const hero: Ref<HeroInterface> = ref({
  id: 0,
  name: "",
  score: 0,
  quality: {
    破坏力: 0,
    速度: 0,
    射程距离: 0,
    持久力: 0,
    精密度: 0,
    成长性: 0,
  },
});
onMounted(async () => {
  await store.dispatch("herolist/GetCurrentHero", { heroID: props.id });
  hero.value = Object.assign({}, store.getters["herolist/getCurrentHero"]);
});

const submitHero = () => {
  console.log(hero.value);
  store.dispatch("herolist/UpdateHero", {
    heroID: props.id,
    source: hero.value,
  });
};
const goBack = () => router.back();

provide(THEME_KEY, "light");
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
    radar: {
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