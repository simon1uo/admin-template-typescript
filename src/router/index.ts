import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    if (to.path !== '/login') {
        const token = localCache.getCache('token')

        if (!token) {
            return '/login'
        }
    }
})

export default router
