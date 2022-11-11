<script setup>
const { options } = defineProps({
  options: {
    type: Array,
    default: () => {
      return {}
    }
  }
})
</script>

<template>
  <el-checkbox-group>
    <el-checkbox v-for="({ label, value }) in options" :label="value">{{ label }}</el-checkbox>
  </el-checkbox-group>
</template>

<style lang="scss" scoped>
</style>