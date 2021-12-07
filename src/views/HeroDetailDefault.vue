<template>
  <div class="hero-detail-default">
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
  name: "HeroDetailDefault",
});
</script>
<script setup lang="ts">
import { ref, provide, computed, onMounted, Ref, h } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  ElRow,
  ElCol,
  ElCard,
  ElInput,
  ElButton,
  ElMessage,
  ElNotification,
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

const submitHero = async () => {
  try {
    await store.dispatch("herolist/UpdateHero", {
      heroID: props.id,
      source: hero.value,
    });
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

try {
  await store.dispatch("herolist/GetCurrentHero", { heroID: props.id });
  hero.value = Object.assign({}, store.getters["herolist/getCurrentHero"]);
  if (!store.getters["herolist/networkStatus"]) {
    ElNotification({
      title: "网络已联通",
      message: h("i", { style: "color: teal" }, "网络已联通"),
    });
    store.commit("herolist/switchNetworkStatus");
  }
} catch (err) {
  if (store.getters["herolist/networkStatus"]) {
    ElNotification({
      title: "网络未通",
      message: h("i", { style: "color: teal" }, String(err)),
    });
    store.commit("herolist/switchNetworkStatus");
  }
}
</script>