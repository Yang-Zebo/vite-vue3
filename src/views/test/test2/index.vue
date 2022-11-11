<script setup>
import BaseTable from '@/components/BaseTable/index.vue'
import { tableData, option } from '@/components/BaseTable/option.js'
import { reactive, ref } from 'vue'


const mergeKeys = reactive(['sex'])
const newOption = reactive(option)
const newData = reactive(tableData)
const table = ref(null)
function changeHandler() {
  const isAdopt = table.value.validate()
}

</script>

<template>
  <div class="card-container">
    <BaseTable ref="table" :data="newData" :mergeKeys="mergeKeys" :option="newOption"></BaseTable>
    <el-button @click="changeHandler">修改</el-button>
  </div>
</template>

<style lang="scss" scoped>
</style>