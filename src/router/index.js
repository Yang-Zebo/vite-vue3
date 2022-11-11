import { createRouter, createWebHistory } from 'vue-router'


export const routes = [
  {
    name: 'first',
    path: '/',
    redirect: '/first',
    component: () => import('@/components/Layout/index.vue'),
    meta: {
      title: '首页',
      icon: '/'
    },
    children: [
      {
        name: 'firstPage',
        path: '/first',
        component: () => import('@/views/first/index.vue'),
        meta: {
          title: '首页',
          icon: 'firstPage'
        }
      }
    ]
  },
  {
    name: 'testAll',
    path: '/test',
    component: () => import('@/components/Layout/index.vue'),
    meta: {
      title: '测试',
      icon: 'testAll'
    },
    children: [
      {
        name: 'test1',
        path: 'test1',
        component: () => import('@/views/test/test1/index.vue'),
        meta: {
          title: '测试1',
          icon: 'test1'
        }
      },
      {
        name: 'test2',
        path: 'test2',
        component: () => import('@/views/test/test2/index.vue'),
        meta: {
          title: '测试2',
          icon: 'test2'
        }
      },
      {
        name: 'test3',
        path: 'test3',
        component: () => import('@/views/test/test3/index.vue'),
        meta: {
          title: '测试3',
          icon: 'test3'
        }
      },
      {
        name: 'test4',
        path: 'test4',
        component: () => import('@/views/test/test4/index.vue'),
        meta: {
          title: '测试4',
          icon: 'test4'
        }
      }
    ]
  }
]
const router = createRouter({
  // 开启历史模式 在 vue2 中使用 mode: history 实现
  history: createWebHistory(),
  routes
})
export default router