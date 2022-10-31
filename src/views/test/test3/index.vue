<script setup>
import BaseDialog from '@/components/BaseDialog/index.vue'
function doConfirm() {
  console.log(11)
}
</script>

<template>
  <div class="card-container">
    <BaseDialog :doConfirm="doConfirm">

    </BaseDialog>
  </div>
</template>

<style lang="scss" scoped>
</style>