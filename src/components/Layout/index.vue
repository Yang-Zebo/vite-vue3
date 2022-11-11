<script name="Layout" setup>
import SideBar from './module/SideBar/index.vue'
import NavBar from './module/NavBar/index.vue'
import { ref, nextTick, provide } from 'vue'


const show = ref(true)
function refresh() {
  show.value = false
  nextTick(() => {
    show.value = true
  })
}
provide('refresh', refresh)
</script>

<template>
  <el-container>
    <el-aside>
      <side-bar></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" v-if="show" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-aside {
    height: 100%;
    width: 200px;
  }

  .el-container {
    .el-header {
      padding: 0;
    }

    .el-main {
      overflow: hidden;

      .fade-enter-active {
        transition: all 0.8s ease-out;
      }

      .fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
      }

      .fade-enter-from,
      .fade-leave-to {
        transform: translateX(80px);
        opacity: 0;
      }
    }
  }

}
</style>