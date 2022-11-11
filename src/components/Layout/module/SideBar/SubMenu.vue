<script name="SubMenu" setup>
import { inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()
const refresh = inject('refresh')
const { subMenuList } = defineProps({
  subMenuList: {
    type: Array,
    default: () => []
  }
})
const howChild = computed(() => {
  return (children) => {
    const showChildArr = children?.filter((item) => {
        return !item.hidden
      }
    )
    return showChildArr?.length
  }
})
const nowChild = computed(() => {
  return (children) => {
    const {
      name,
      children: child,
      meta,
      hidden
    } = children[0]
    return {
      name,
      children: child,
      meta,
      hidden
    }
  }
})
function to(name) {
  if (route.name === name) {
    // 刷新layout的 router-view
    refresh()
    return
  } else {
    router.push({
      name
    })
  }
}
</script>

<template>
  <div class="sub-menu">
    <template v-for="{ name, children, meta, hidden } in subMenuList">
      <template v-if="!hidden">
        <el-sub-menu v-if="howChild(children) > 1" :index="name">
          <template #title>
            <i :class="meta.icon"></i>
            <span>{{ meta.title }}</span>
          </template>
          <sub-menu :subMenuList="children"></sub-menu>
        </el-sub-menu>
        <el-menu-item v-else-if="howChild(children) === 1"
                      :index="nowChild(children).name"
                      @click="to(nowChild(children).name)">
          <i :class="nowChild(children).meta.icon"></i>
          <span>{{ nowChild(children).meta.title }}</span>
        </el-menu-item>
        <el-menu-item v-else :index="name" @click="to(name)">
          <i :class="meta.icon"></i>
          <span>{{ meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>