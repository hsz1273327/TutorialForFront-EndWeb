<template>
  <div class="hero-list">
    <el-row type="flex" justify="center">
      <h2>Hero List</h2>
    </el-row>
    <el-row type="flex" justify="center">
      <el-table :data="heros" style="width: 100%">
        <el-table-column label="id" width="180" align="center">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="name" width="180" align="center">
          <template #default="scope">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { DefaultHeros } from "../const";
const router = useRouter();
const heros = ref(Object.assign([], DefaultHeros));
const handleEdit = (index: any, row: any) => {
  router.push(`/herodetail/${row.id}`);
};
const handleDelete = (index: any, row: any) => {
  console.log(index, row);
};
</script>