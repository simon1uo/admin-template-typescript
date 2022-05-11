<template>
    <div class="nav-header">
        <el-icon :size="20" style="cursor: pointer">
            <component
                :is="isFold ? 'fold' : 'expand'"
                @click="handleFoldClick"
            />
        </el-icon>
        <div class="nav-header-content">
            <Breadcrumb :breadcrumb-items="breadcrumbItems" />
            <NavUserInfo />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import NavUserInfo from './NavUserInfo.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapToBreadcrumbs } from '@/utils/map-menus'
import Breadcrumb from '@/base-ui/Breadcrumb/src/Breadcrumb.vue'

export default defineComponent({
    name: 'NavHeader',
    components: { Breadcrumb, NavUserInfo },
    emits: ['foldChange'],
    setup(props, { emit }) {
        const isFold = ref(false)

        const handleFoldClick = () => {
            isFold.value = !isFold.value
            emit('foldChange', isFold.value)
        }

        const store = useStore()
        const breadcrumbItems = computed(() => {
            const userMenus = store.state.login.userMenus
            const route = useRoute()
            const currentPath = route.path
            return pathMapToBreadcrumbs(userMenus, currentPath)
        })
        return {
            isFold,
            handleFoldClick,
            breadcrumbItems
        }
    }
})
</script>

<style lang="less" scoped>
.nav-header {
    display: flex;
    width: 100%;
    align-items: center;
    .nav-header-content {
        display: flex;
        flex: 1;
        padding: 0 22px;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
