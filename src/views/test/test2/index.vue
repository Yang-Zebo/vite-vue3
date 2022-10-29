<script setup>
 import BaseTable from '@/components/BaseTable/index.vue'
 import { tableData, option } from '@/components/BaseTable/option.js'
 import {reactive} from 'vue'
 function rowClick(row, event, column) {
   console.log('row',row)
   console.log('event',event)
   console.log('column',column)
 }
 const mergeKeys = reactive(['sex'])
</script>

<template>
  <div class="card-container">
    <BaseTable :data="tableData" :option="option" @row-click="rowClick" :mergeKeys="mergeKeys"></BaseTable>
  </div>
</template>

<style lang="scss" scoped>
</style>