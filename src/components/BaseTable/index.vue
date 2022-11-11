<script name="BaseTable" setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'


const {
  data,
  option,
  rowClassName,
  mergeKeys,
  tableColSpan
} = defineProps({
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
const table = ref(null)
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
  return dic.filter(({ children }) => {
    return children
  })?.length
}
function findLabel(val, dic) {
  const label = dic.find(({ value }) => {
    return value === val
  })?.label
  return label || val
}
function findChildrenLabel(val, dic, childProp) {
  const flatArr = []
  function flatDic(dic, childProp) {
    for (let i = 0; i <= dic.length - 1; i++) {
      const item = {
        label: dic[i].label,
        value: dic[i].value
      }
      flatArr.push(item)
      if (dic[i]?.[childProp]?.length) {
        flatDic(dic[i]?.[childProp], childProp)
      }
    }
  }
  flatDic(dic, childProp)
  const flatObj = {}
  flatArr.map(({
    label,
    value
  }) => {
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
    if (isHasChildren(dic)) {
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
  if (keyIndex < 0) {
    return true
  }
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
    const {
      row,
      column,
      rowIndex,
      columnIndex
    } = tableObj
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
// 表格校验
// 返回校验不通过的消息并且设置表格数据'$validate'
const validateMsg = computed(() => {
  return (rules, row, prop) => {
    if (!Reflect.has(row, '$validate')) {
      Reflect.set(row, '$validate', {})
    }
    for (let key in rules) {
      const ruleItem = rules[key]
      const validate = ruleItem?.validate(row[prop]) ?? false
      if (!validate) {
        Reflect.set(row['$validate'], prop, false)
        return ruleItem?.message
      }
    }
    Reflect.set(row['$validate'], prop, true)
    return false
  }
})
function validate() {
  const validateArr = data.reduce((preValue, { $validate }) => {
    const validate = Object.values($validate)
    return [...preValue, ...validate]
  }, [])
  const unAdopt = validateArr.some(item => {
    return item === false
  })
  if (unAdopt) {
    ElMessage({
      message: '校验不通过',
      type: 'warning'
    })
    return false
  }
  return true
}
defineExpose({
  validate
})

</script>

<template>
  <el-table ref="table"
            v-loading="tableLoading"
            :border="option.border" :data="data"
            :height="option.height"
            :max-height="option.maxHeight"
            :row-class-name="tableRowClassName"
            :span-method="tableSpanMethod"
            @select="select"
            @row-click="rowClick"
            @select-all="selectAll"
            @selection-change="selectionChange">
    <!-- 下拉弹出框  -->
    <el-table-column
      v-if="option.expand"
      key="expand"
      align="center"
      fixed="left"
      type="expand"
      width="50">
      <template #default="props">
        <slot :row="props.row" name="expand"></slot>
      </template>
    </el-table-column>
    <!-- 选择框 -->
    <el-table-column
      v-if="option.selection"
      key="selection"
      align="center"
      type="selection"
      width="50">
    </el-table-column>
    <!--  序号列  -->
    <el-table-column
      v-if="option.index"
      key="index"
      :label="indexLabel"
      align="center"
      fixed="left"
      type="index"
      width="50">
    </el-table-column>
    <!-- 循环列 -->
    <el-table-column
      v-for="(column, index) in option.column"
      :key="column.prop"
      :align="colAlign(column.align)"
      :fixed="column.fixed || false"
      :label="column.label"
      :min-width="column.minWidth"
      :prop="column.prop">
      <template #default="scope">
        <slot :name="column.prop" v-bind="scope">
          <div v-if="column.ipt" class="self-input-item">
            <el-input v-model="scope.row[column.prop]"></el-input>
            <div class="error-message-box">
              <Transition name="error">
                <div v-if="validateMsg(column.tableRules, scope.row, column.prop)" class="error-message">
                  {{ validateMsg(column.tableRules, scope.row, column.prop) }}
                </div>
              </Transition>
            </div>
          </div>
          <span v-else-if="column.format">
            {{ formatHandle(column.format, scope.row[column.prop]) }}
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
.self-input-item {
  .el-input {
    margin-bottom: 15px;
  }

  .error-message-box {
    position: absolute;
    bottom: 0px;
    height: 24px;

    .error-message {
      font-size: 12px;
      color: $color-danger;
    }
  }
}

.error-enter-active,
.error-leave-active {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
}
</style>