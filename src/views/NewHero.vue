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
            <el-button type="primary" round @click="randomHeroQuality">随机生成</el-button>
            <el-button type="primary" @click="submitHero">Create</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <v-chart class="chart" :option="option" style="height: 400px" />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, watch } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { useHeroStore, type HeroInterface } from '../stores/herolist'

const router = useRouter()
const store = useHeroStore()
const { AppendHero } = store
const random100 = () => Math.floor(Math.random() * 100 + 1)

const _defaultHeroInfo: HeroInterface = {
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
}
let _cache: string | null = sessionStorage.getItem("create_hero_cache")
const hero = ref<HeroInterface>(Object.assign({}, _defaultHeroInfo))

if (_cache) {
  const cahcedHeroInfo = JSON.parse(_cache) as HeroInterface
  hero.value = cahcedHeroInfo
}

watch(hero, (newValue: Ref<HeroInterface>) => {
  sessionStorage.setItem("create_hero_cache", JSON.stringify(newValue.value))
})

const submitHero = async () => {
  console.log(hero.value)
  try {
    await AppendHero(hero.value)
    sessionStorage.removeItem("create_hero_cache")
    router.back()
  } catch (error) {
    if (typeof error === "string") {
      ElMessage({
        showClose: true,
        message: error,
        type: "error",
      })
    }
  }

}
const resetForm = () => {
  hero.value = Object.assign({}, _defaultHeroInfo)
  sessionStorage.removeItem("create_hero_cache")
}
const randomHeroQuality = () => {
  hero.value.quality = {
    速度: random100(),
    成长性: random100(),
    持久力: random100(),
    破坏力: random100(),
    精密度: random100(),
    射程距离: random100(),
  }
  hero.value.score =
    Math.floor(
      Object.entries(hero.value.quality).reduce(
        (a: [string, number], b: [string, number]) => ["", a[1] + b[1]]
      )[1] / 6
    ) + random100()
}

const option = computed(() => {
  const heroattrs = [
    "破坏力",
    "速度",
    "射程距离",
    "持久力",
    "精密度",
    "成长性",
  ]
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
  }
})
</script>