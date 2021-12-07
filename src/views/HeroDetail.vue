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
    <!-- <suspense > -->
    <suspense>
      <template #default>
        <HeroDetailDefault :id="id" />
      </template>
      <template #fallback>
        <el-empty :v-loading="true" description="Loading.."></el-empty>
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeroDetail",
});
</script>
<script setup lang="ts">
import HeroDetailDefault from "./HeroDetailDefault.vue";
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDivider,
  ElButton,
  ElLoading,
  ElMessage,
  ElEmpty,
} from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
interface Props {
  id: number;
}
const props = defineProps<Props>();
const goBack = () => router.back();
</script>