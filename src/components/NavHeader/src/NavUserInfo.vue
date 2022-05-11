<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span class="name">{{ name }}</span>
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item icon="user">用户信息</el-dropdown-item>
                <el-dropdown-item icon="setting">系统管理</el-dropdown-item>
                <el-dropdown-item icon="close" @click="handleLogoutClick"
                    >退出登录</el-dropdown-item
                >
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
    name: 'NavUserInfo',
    setup() {
        // store
        const store = useStore()
        const name = computed(() => store.state.login.userInfo.name)

        // router
        const router = useRouter()
        // logout
        const handleLogoutClick = () => {
            console.log('?logout')
            localCache.removeCache('token')
            router.push('/main')
        }
        return {
            name,
            handleLogoutClick
        }
    }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .name {
        margin-left: 5px;
    }
}
</style>
