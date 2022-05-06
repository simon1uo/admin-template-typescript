import { App } from 'vue'
import 'element-plus/dist/index.css'

import {
    ElAlert,
    ElAside,
    ElAutocomplete,
    ElAvatar,
    ElBacktop,
    ElBadge,
    ElButton,
    ElTable,
    ElTabPane,
    ElTabs,
    ElIcon,
    ElHeader,
    ElContainer,
    ElMain,
    ElFooter
} from 'element-plus'

const components = [
    ElButton,
    ElTable,
    ElAlert,
    ElAside,
    ElAutocomplete,
    ElAvatar,
    ElBacktop,
    ElBadge,
    ElTabs,
    ElTabPane,
    ElIcon,
    ElHeader,
    ElContainer,
    ElMain,
    ElFooter
]

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function (app: App): void {
    for (const cpn of components) {
        app.component(cpn.name, cpn)
    }

    for (const [key, cpn] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, cpn)
    }
}
