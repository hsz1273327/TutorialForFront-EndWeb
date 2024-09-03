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

<script setup lang="ts">
import { ref, computed, h } from "vue"
import { ElMessage, ElNotification } from 'element-plus'
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia'
import { useHeroStore, type HeroInterface } from '../stores/herolist'

const router = useRouter()
const heroStore = useHeroStore()
// 作为 action 的 increment 可以直接解构
const { GetHero, UpdateHero } = heroStore
// const { GetHero, UpdateHero, SwitchNetworkStatus } = heroStore
const { isOnline } = storeToRefs(heroStore)

interface Props {
  id: number
}
const props = defineProps<Props>()

const hero = ref<HeroInterface>({
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
})
const submitHero = async () => {
  console.log(hero.value)
  if (hero.value) {
    try {
      await UpdateHero(props.id, hero.value)
    } catch (err) {
      if (typeof err === "string") {
        ElMessage({
          showClose: true,
          message: err,
          type: "error",
        })
      }
    }
    router.back()
  } else {
    console.log("hero is none")
  }
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
  if (hero.value) {
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
  } else {
    return {}
  }
})

const init = async () => {
  try {
    const _hero = await GetHero(props.id)
    if (_hero) {
      hero.value = _hero
    }
  } catch (error) {
    if (typeof error === "string") {
      ElMessage({
        showClose: true,
        message: error,
        type: "error",
      })
    }
    throw error
  }
}
await init()
</script>