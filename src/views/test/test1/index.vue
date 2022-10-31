<script setup>
import BaseForm from '@/components/BaseForm/index.vue'
import BaseDialog from '@/components/BaseDialog/index.vue'
import { option } from '@/components/BaseForm/option.js'
import { reactive } from 'vue'
const form = reactive({})

</script>

<template>
  <div class="card-container">
    <base-form :option="option" :form="form"></base-form>
    <BaseDialog>
    </BaseDialog>
  </div>
</template>

<style lang="scss" scoped>
</style>