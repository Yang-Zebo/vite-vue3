<script setup name="BaseTable">
import {computed, ref, watch} from 'vue'

const { data, option, rowClassName, mergeKeys, tableColSpan } = defineProps({
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
  rowClassName: Function,
  mergeKeys: {
    type: Array,
    default: () => []
  },
  tableColSpan: Function
})
const emit = defineEmits(['row-click', 'selection', 'select-all', 'selection-change'])

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


// 格式化表格内容
function formatHandle(fn, val) {
  return fn(val) ?? val
}
// 自动显示有 dic 项的表格内容
function isHasChildren(dic) {
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
const isShowDicText = computed(() => {
  return (dic) => {
    return dic?.length
  }
})
const dicText = computed(() => {
  return (val, dic, childProp) => {
    if(isHasChildren(dic)) {
      return findChildrenLabel(val, dic, childProp)
    } else {
      return findLabel(val, dic)
    }
  }
})


// 表格合并
let rowSpanObj
const tableData = computed(() => {
  return data
})
watch(tableData, (newVal) => {
  if (mergeKeys.length) {
    rowSpanObj = handleTableSpan(mergeKeys, newVal)
  }
}, {
  immediate: true
})
function handleTableSpan(mergeKeys, tableData) {
  const spanObj = {}
  if (mergeKeys instanceof Array && tableData instanceof Array && mergeKeys.length && tableData.length) {
    mergeKeys.forEach((key, keyIndex) => {
      spanObj[key] = []
      let position = 0
      tableData.forEach((item, index) => {
        if (index === 0) {
          spanObj[key].push(1)
          position = 0
        } else {
          const isObj = tableData[index][key] instanceof Array || tableData[index][key] instanceof Object
          if (isKeysMerge(tableData, index, mergeKeys, keyIndex, isObj)) {
            spanObj[key][position] += 1
            spanObj[key].push(0)
          } else {
            spanObj[key].push(1)
            position = index
          }
        }
      })
    })
    return spanObj
  }
}
function isKeysMerge(tableData, index, mergeKeys, keyIndex, isObj) {
  if (keyIndex < 0) return true
  if (isObj) {
    return (
        JSON.stringify(tableData[index][mergeKeys[keyIndex]]) ===
        JSON.stringify(tableData[index - 1][mergeKeys[keyIndex]]) &&
        isKeysMerge(tableData, index, mergeKeys, keyIndex - 1, isObj)
    )
  } else {
    return (
        tableData[index][mergeKeys[keyIndex]] === tableData[index - 1][mergeKeys[keyIndex]] &&
        isKeysMerge(tableData, index, mergeKeys, keyIndex - 1, isObj)
    )
  }
}
function handleObjectSpanMethod(tableObj, mergeKeys, rowspanObj) {
  if (mergeKeys instanceof Array && rowspanObj instanceof Object) {
    const { row, column, rowIndex, columnIndex } = tableObj
    for (let i = 0; i < mergeKeys.length; i++) {
      let term = column.property === mergeKeys[i]
      if (term) {
        const _row = rowspanObj[mergeKeys[i]][rowIndex]
        let _col
        // 自定义设置合并列时使用该方法
        if (tableColSpan && tableColSpan(tableObj)) {
          _col = tableColSpan(tableObj)
        } else {
          _col = _row > 0 ? 1 : 0
        }
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
function tableSpanMethod(tableObj) {
  return handleObjectSpanMethod(tableObj, mergeKeys, rowSpanObj)
}

// element 表格方法与属性
function tableRowClassName(param) {
  if (typeof rowClassName === 'function') {
    return rowClassName(param)
  }
}
function rowClick(row, column, event) {
  emit('row-click', row, column, event)
}
function select(selection, row) {
  emit('select', selection, row)
}
function selectAll(selection) {
  emit('select-all', selection)
}
function selectionChange(selection) {
  emit('selection-change', selection)
}

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
<!--          <div v-if="column.ipt" class="el-form-item" :class="[{'is-error': isError}]">
            <div class="el-form-item__content">
              <slot>
                <el-input v-model="scope.row[column.prop]"></el-input>
              </slot>
              <div
                  v-if="isError"
                  class="el-form-item__error"
              >
                {{ validateMessage }}
              </div>
            </div>
          </div>-->
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