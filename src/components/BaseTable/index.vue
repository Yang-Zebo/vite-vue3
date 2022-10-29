<script setup name="BaseTable">
import {computed, reactive, ref} from 'vue'

const { data, option, rowClassName } = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object,
    default: () => {
      return {}
    }
  },
  rowClassName: Function
})

const emit = defineEmits(['row-click'])

const table = ref()
const tableLoading = ref(false)

const indexLabel = computed(() => {
  return option.indexLabel || '序号'
})
const colAlign = computed(() => {
  return (colAlign) => {
    return colAlign || option.align
  }
})

// 显示表格格子里的内容
function formatHandle(fn, val) {
  return fn(val) ?? val
}
const isShowDicText = computed(() => {
  return (dic) => {
    return dic?.length
  }
})
const dicText = computed(() => {
  return (val, dic, childProp) => {
    if(hasChildren(dic)) {
      return findChildrenLabel(val, dic, childProp)
    } else {
      return findLabel(val, dic)
    }
  }
})
function hasChildren(dic) {
  return dic.filter(({children}) => {
    return children
  })?.length
}
function findLabel(val, dic) {
  const label = dic.find(({value}) => {
    return value === val
  })?.label
  return label || val
}
function findChildrenLabel(val, dic, childProp) {
  const flatArr = []
  function flatDic(dic, childProp) {
    for(let i = 0; i <= dic.length -1; i++) {
      const item = {
        label: dic[i].label,
        value: dic[i].value
      }
      flatArr.push(item)
      if(dic[i]?.[childProp]?.length) {
        flatDic(dic[i]?.[childProp], childProp)
      }
    }
  }
  flatDic(dic, childProp)
  const flatObj = {}
  flatArr.map(({label, value}) => {
    Reflect.set(flatObj, value, label)
  })
  return flatObj[val] || val
}

function tableRowClassName(param) {
  if (typeof rowClassName === 'function') {
    return rowClassName(param)
  }
}

function tableSpanMethod() {}

function rowClick(row, event, column) {
  emit('row-click', row, event, column)
}

function select(selection, row) {
  // this.$emit('select', selection, row)
}

function selectAll() {}

function selectionChange() {}
</script>

<template>
  <el-table v-loading="tableLoading"
            ref="table"
            :data="data" :border="option.border"
            :height="option.height"
            :max-height="option.maxHeight"
            :row-class-name="tableRowClassName"
            :span-method="tableSpanMethod"
            @row-click="rowClick"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange">
    <!-- 下拉弹出框  -->
    <el-table-column
        v-if="option.expand"
        key="expand"
        type="expand"
        width="50"
        fixed="left"
        align="center">
      <template #default="props">
        <slot :row="props.row" name="expand"></slot>
      </template>
    </el-table-column>
    <!-- 选择框 -->
    <el-table-column
        v-if="option.selection"
        key="selection"
        type="selection"
        width="50"
        align="center">
    </el-table-column>
    <!--  序号列  -->
    <el-table-column
        v-if="option.index"
        key="index"
        type="index"
        width="50"
        fixed="left"
        align="center"
        :label="indexLabel">
    </el-table-column>
    <!-- 循环列 -->
    <el-table-column
        v-for="(column, index) in option.column"
        :key="column.prop"
        :prop="column.prop"
        :min-width="column.minWidth"
        :align="colAlign(column.align)"
        :label="column.label"
        :fixed="column.fixed || false">
      <template #default="scope">
        <slot v-bind="scope" :name="column.prop">
          <span v-if="column.format">
              {{ formatHandle(column.format, scope.row[column.prop])}}
          </span>
          <span v-else-if="isShowDicText(column.dic)">
              {{ dicText(scope.row[column.prop], column.dic, column.childProp || 'children') }}
          </span>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
</style>