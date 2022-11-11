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
  <el-radio-group>
    <el-radio
      v-for="({ label, value }) in options"
      :key="value"
      :label="value"
    >{{ label }}
    </el-radio>
  </el-radio-group>

</template>

<style lang="scss" scoped>
</style>