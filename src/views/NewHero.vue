<template>
  <div class="new-hero">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>create-hero</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row type="flex" justify="center">
      <h1>创建英雄</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card shadow="hover">
        <el-form label-position="top" label-width="100px" :model="hero">
          <el-form-item label="Name">
            <el-input v-model="hero.name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" round @click="randomHeroQuality"
              >随机生成</el-button
            >
            <el-button type="primary" @click="submitHero">Create</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <v-chart class="chart" :option="option" style="height: 400px" />
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewHero",
});
</script>
<script setup lang="ts">
import { ref, computed, Ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDivider,
  ElRow,
  ElCard,
  ElInput,
  ElButton,
  ElForm,
  ElFormItem,
  ElMessage,
} from "element-plus";
import { QualityInterface, NewHeroQueryInterface } from "../const";
const router = useRouter();
const random100 = () => Math.floor(Math.random() * 100 + 1);
const store = useStore();
const _defaultHeroInfo: NewHeroQueryInterface = {
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
};
let _cache: string | null = sessionStorage.getItem("create_hero_cache");
const hero: Ref<NewHeroQueryInterface> = ref(
  Object.assign({}, _cache ? JSON.parse(_cache) : _defaultHeroInfo)
);
watch(hero, (newValue: Ref<NewHeroQueryInterface>) => {
  sessionStorage.setItem("create_hero_cache", JSON.stringify(newValue.value));
});
const submitHero = async () => {
  try {
    await store.dispatch("herolist/AppendHero", {
      heroObj: hero.value,
    });
    sessionStorage.removeItem("create_hero_cache");
    router.back();
  } catch (err) {
    if (typeof err === "string") {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    }
  }
};
const resetForm = () => {
  hero.value = Object.assign({}, _defaultHeroInfo);
  sessionStorage.removeItem("create_hero_cache");
};
const randomHeroQuality = () => {
  hero.value.quality = {
    速度: random100(),
    成长性: random100(),
    持久力: random100(),
    破坏力: random100(),
    精密度: random100(),
    射程距离: random100(),
  };
  hero.value.score =
    Math.floor(
      Object.entries(hero.value.quality).reduce(
        (a: [string, number], b: [string, number]) => ["", a[1] + b[1]]
      )[1] / 6
    ) + random100();
};

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