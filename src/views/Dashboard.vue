<template>
  <div class="dashboard">
    <el-row type="flex" justify="center">
      <h2>Top Heros</h2>
    </el-row>
    <el-row :gutter="1" type="flex" justify="space-around">
      <template v-for="item in allHeros" :key="item.id">
        <el-col span="4">
          <el-card shadow="hover">{{ item.name }}</el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHeroStore } from '../stores/herolist'

const store = useHeroStore()
const { allHeros } = storeToRefs(store)
</script>
