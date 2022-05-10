<template>
    <div class="nav-side-menu">
        <div class="logo">
            <img class="logo-img" src="~@/assets/logo.png" alt="logo" />
            <span class="title" v-if="!isCollapse">admin-template</span>
        </div>
        <el-menu
            :default-active="defaultActiveValue"
            class="el-menu-vertical"
            background-color="#0c2135"
            text-color="#b7bdc3"
            active-text-color="#0a60bd"
            :collapse="isCollapse"
        >
            <template v-for="item in userMenus" :key="item.id">
                <!--二级菜单-->
                <template v-if="item.type === 1">
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <el-icon>
                                <component
                                    v-show="item.icon"
                                    :is="item.icon.match(/el-icon(\S*)/)[1]"
                                />
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <!--二级菜单里的子菜单-->
                        <template
                            v-for="subItem in item.children"
                            :key="subItem.id"
                        >
                            <el-menu-item
                                :index="subItem.id + ''"
                                @click="handleMenuItemClick(subItem)"
                            >
                                <span>{{ subItem.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <!--一级菜单-->
                <template v-else-if="item.type === 2">
                    <el-menu-item :index="item.id + ''">
                        <span>{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    name: 'NavSideMenu',
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        // store
        const store = useStore()
        const userMenus = computed(() => store.state.login.userMenus)

        return {
            userMenus
        }
    }
})
</script>

<style lang="less" scoped>
.nav-side-menu {
    height: 100%;
    background-color: #001529;

    .logo {
        display: flex;
        height: 28px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 12px 10px 8px 10px;

        .logo-img {
            height: 100%;
            margin: 0 10px;
        }
        .title {
            color: #f0f2f5;
            font-weight: 700;
            font-size: 16px;
        }
    }
}
</style>
