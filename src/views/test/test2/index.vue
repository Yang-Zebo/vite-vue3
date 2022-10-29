<script setup>
 import BaseTable from '@/components/BaseTable/index.vue'
 import { tableData, option } from '@/components/BaseTable/option.js'
 import {reactive} from 'vue'
</script>

<template>
  <div class="card-container">
    <BaseTable :data="tableData" :option="option"></BaseTable>
  </div>
</template>

<style lang="scss" scoped>
</style>