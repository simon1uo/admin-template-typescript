import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
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

export default router
