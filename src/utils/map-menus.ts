import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/Breadcrumb/type'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []

    // 加载所有 routes
    const allRoutes: RouteRecordRaw[] = []
    // 加载文件路径
    const routeFiles = require.context('../router/Main', true, /\.ts/)

    routeFiles.keys().forEach((key) => {
        const route = require('../router/Main' + key.split('.')[1])
        allRoutes.push(route.default)
    })

    // 根据用户菜单获取需要添加的routes
    const _recurseGetRoute = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 2) {
                const route = allRoutes.find((route) => route.path === menu.url)
                if (route) {
                    routes.push(route)
                }
                if (!firstMenu) firstMenu = menu
            } else {
                _recurseGetRoute(menu.children)
            }
        }
    }

    _recurseGetRoute(userMenus)
    return routes
}

export function pathMapToMenu(
    userMenus: any[],
    currentPath: string,
    breadcrumbs?: IBreadcrumb[]
): any {
    console.log(currentPath)
    for (const menu of userMenus) {
        if (menu.type === 1) {
            const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
            if (findMenu) {
                breadcrumbs?.push({ name: menu.name })
                breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
                return findMenu
            }
        } else if (menu.type === 2 && menu.url === currentPath) {
            return menu
        }
    }
}

export function pathMapBreadcrumbs(userMenu: any[], currentPath: string): any {
    const breadcrumbs: IBreadcrumb[] = []
    pathMapToMenu(userMenu, currentPath, breadcrumbs)
    return breadcrumbs
}

export { firstMenu }
