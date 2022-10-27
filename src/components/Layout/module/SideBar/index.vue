<script setup name="SideBar">
import SubMenu from './SubMenu.vue'
import { reactive, computed} from "vue"
import { routes } from '@/router/index.js'
import { useRoute } from 'vue-router'


const route = useRoute()
const active =  computed(() => route.name)

const routesReactive = reactive(routes)
</script>

<template>
  <div class="side-bar">
    <div class="web-title">My Layout</div>
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="active.value">
        <sub-menu :subMenuList="routesReactive"></sub-menu>
      </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.side-bar {
  width: 200px;
  height: 100%;
  background-color: #545c64;
  .web-title {
    height: 60px;
    line-height: 55px;
    text-align: center;
    font-size: 28px;
    color: #fff;
  }
  .el-menu {
    border-right: none;
  }
}
</style>