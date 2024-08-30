<template>
  <div class="new-hero">
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
            <el-button type="primary" @click="submitHero">Create</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const _defaultHeroInfo = {
  name: "",
};
const hero = ref(Object.assign({}, _defaultHeroInfo));
const submitHero = () => {
  console.log(hero.value);
};
const resetForm = () => {
  hero.value = Object.assign({}, _defaultHeroInfo);
};
</script>