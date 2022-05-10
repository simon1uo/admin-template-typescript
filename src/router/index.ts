import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        name: 'Main',
        path: '/main',
        component: () => import('@/views/Main/Main.vue')
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/Login/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/404/404.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to) => {
    if (to.path !== '/login') {
        const token = localCache.getCache('token')

        if (!token) {
            return '/login'
        }
    }

    // 第一个菜单
    if (to.path === '/main') {
        return firstMenu.url
    }
})

export default router
