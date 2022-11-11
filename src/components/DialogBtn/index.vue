<script name="DialogBtn" setup>
import { reactive, ref } from 'vue'


const {
  btnText,
  btnType,
  btnSize,
  dialogWidth,
  title,
  cancelText,
  confirmText,
  doConfirm,
  showFooter,
  maxHeight,
  minHeight,
  isText
} = defineProps({
  btnText: {
    type: String,
    default: 'Button'
  },
  btnType: {
    type: String,
    default: 'primary'
  },
  btnSize: {
    type: String,
    default: 'default'
  },
  dialogWidth: {
    type: String,
    default: '50%'
  },
  title: {
    type: String,
    default: 'Tips'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  doConfirm: {
    type: Function
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  minHeight: {
    type: String,
    default: '100px'
  },
  maxHeight: String,
  isText: {
    type: Boolean,
    default: true
  }
})
const dialogVisible = ref(false)
const bodyStyle = reactive({
  'max-height': maxHeight,
  'min-height': minHeight,
  overflowY: 'auto',
  overflowX: 'hidden'
})
const loading = ref(false)
function openDialog() {
  dialogVisible.value = true
}
function closeDialog() {
  dialogVisible.value = false
}
function confirmHandle() {
  try {
    loading.value = true
    doConfirm && doConfirm()
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
    dialogVisible.value = false
  }
}

</script>

<template>
  <div @click="openDialog">
    <slot name="button">
      <el-button :size="btnSize" :text="isText" :type="btnType">{{ btnText }}</el-button>
    </slot>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" :width="dialogWidth" append-to-body draggable>
    <template #header="{close, titleId, titleClass}">
      <slot :close="close" :titleClass="titleClass" :titleId="titleId" name="header"></slot>
    </template>
    <div :style="bodyStyle">
      <slot>
        Content
      </slot>
    </div>
    <template v-if="showFooter" #footer>
      <slot :closeDialog="closeDialog" name="footer">
        <el-button @click="closeDialog">{{ cancelText }}</el-button>
        <el-button :loading="loading" type="primary" @click="confirmHandle">
          {{ confirmText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>