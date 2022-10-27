<script setup>
 import BaseTable from '@/components/BaseTable/index.vue'
 import {reactive} from 'vue'
 const tableData = reactive([])
</script>

<template>
  <div class="card-container">
    <BaseTable :data="tableData"></BaseTable>
  </div>
</template>

<style lang="scss" scoped>
</style>