<script setup>
import BaseForm from '@/components/BaseForm/index.vue'
import { option } from '@/components/BaseForm/option.js'
import { reactive } from 'vue'


const form = reactive({})

</script>

<template>
  <div class="card-container">
    <base-form :form="form" :option="option"></base-form>
  </div>
</template>

<style lang="scss" scoped>
</style>