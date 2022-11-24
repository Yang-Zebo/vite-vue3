<script name="BaseTabs" setup>
import {ref} from 'vue'


const {option} = defineProps({
  option: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const activeName = ref(option?.['tabList']?.[0]?.name)
const handleClick = (tab, event) => {

}
</script>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="item in option.tabList" :key="item.name" :label="item.label" :name="item.name">
      <slot v-if="item.name === activeName" :tab="item">
        {{ item.label }}
      </slot>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
</style>