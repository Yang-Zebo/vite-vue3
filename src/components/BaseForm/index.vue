<script setup name="BaseForm">
import MyInput from './module/MyInput.vue'
import MyRadio from './module/MyRadio.vue'
import MySelect from './module/MySelect.vue'
import MyCheckbox from './module/MyCheckbox.vue'
import MyCascader from './module/MyCascader.vue'
import MyDate from './module/MyDate.vue'
import {computed, ref} from 'vue'

// 使用 ref api，只要变量名与 dom 上的 ref 一致就可以
const formRef = ref()

const {form, option} = defineProps({
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
  })

const mdSpan = computed(() => {
  return (colSpan) => {
    return colSpan || option.span || 6
  }
})
const menuSpan = computed(() => {
  return option.menuSpan || option.span || 6
})
const labelWidth = computed(() => {
  return (colLabelWidth) => {
    return option.labelWidth || colLabelWidth
  }
})
const menuMarginLeft = computed(() => {
  return option.labelWidth || `50px`
})

const formSize = computed(() => {
  return option?.size ?? 'default'
})
const labelPosition = computed(() => {
  return option?.labelPosition ?? 'right'
})
const searchBtnText = computed(() => {
  return option?.searchBtnText ?? '搜索'
})

const isShowBtn = computed(() => {
  return option?.btn !== false
})
const isShowResetBtn = computed(() => {
  return option?.resetBtn !== false
})
const isShowSearchBtn = computed(() => {
  return option?.searchBtn !== false
})

const formComponents = computed(() => {
  return (type) => {
    let components = {
      select: MySelect,
      radio: MyRadio,
      checkbox: MyCheckbox,
      cascader: MyCascader,
      date: MyDate
    }
    return  components[type] || MyInput
  }
})
const dateType = computed(() => {
  return (dateType) => {
    return dateType ?? 'datetimerange'
  }
})

const eventName = ref('change')
function handler() {
  console.log('form',form)
}
function resetForm() {
  formRef.value.resetFields()
}

</script>

<template>
  <el-form
      ref="formRef"
      :model="form"
      :size="formSize"
      :label-position="labelPosition"
      :label-width="labelWidth(0)">
    <el-row>
      <el-col
          v-for="(column, index) in option.column"
          :key="column.prop"
          :lg="mdSpan(column.span)"
          :sm="12"
          :xs="24">
        <el-form-item
            :label="column.label"
            :prop="column.prop"
            :label-width="labelWidth(column.labelWidth)"
            :rules="column.rules">
          <component
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="form[column.prop]"
              :clearable="true"
              :is="formComponents(column.type)"
              :options="column.dic"
              :prop="column.prop"
              :placeholder="column.placeholder"
              :props="column.props || {}"
              :size="formSize"
              :type="dateType(column.dateType)"
              @[eventName]="handler">
          </component>
        </el-form-item>
      </el-col>
      <el-col
          v-if="isShowBtn"
          :lg="menuSpan"
          :sm="12"
          :xs="24">
        <el-form-item :label-width="menuMarginLeft">
          <slot name="menu">
            <el-button
                v-if="isShowResetBtn"
                @click="resetForm"
                :size="formSize">
              {{ '重置' }}
            </el-button>
            <el-button
                type="primary"
                :size="formSize"
                v-if="isShowSearchBtn"
            >
              {{ searchBtnText }}
            </el-button></slot
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
</style>