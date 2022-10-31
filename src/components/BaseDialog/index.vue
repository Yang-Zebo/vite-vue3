<script setup name="BaseDialog">
import { ref } from 'vue'
const { btnText, btnType, btnSize, dialogWidth, title, cancelText, confirmText,  doConfirm} = defineProps({
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
  }
})

const dialogVisible = ref(false)

function openDialog() {
  dialogVisible.value = true
}
function closeDialog() {
  dialogVisible.value = false
}
function confirmHandle() {
  try {
    doConfirm && doConfirm()
  } catch (err){
    console.log(err)
  } finally {
    dialogVisible.value = false
  }
}
</script>

<template>
  <div @click="openDialog">
    <slot name="button" :type="btnType" :size="btnSize" :btnText="btnText" :openDialog="openDialog">
      <el-button :type="btnType" :size="btnSize" >{{ btnText }}</el-button>
    </slot>
  </div>
  <el-dialog v-model="dialogVisible" :title="title" :width="dialogWidth" draggable>
    <template #header="{close, titleId, titleClass}">
      <slot name="header" :close="close" :titleId="titleId" :titleClass="titleClass"></slot>
    </template>
    <slot>
      Content
    </slot>
    <template #footer>
      <slot name="footer" :closeDialog="closeDialog" :dialogVisible="dialogVisible">
        <el-button @click="closeDialog">{{ cancelText }}</el-button>
        <el-button type="primary" @click="confirmHandle">
          {{ confirmText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>