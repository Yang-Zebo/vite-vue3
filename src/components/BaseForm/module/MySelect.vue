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
  <el-select>
    <el-option
      v-for="({ label, value }) in options"
      :key="value"
      :label="label"
      :value="value"
    />
  </el-select>
</template>

<style lang="scss" scoped>
</style>