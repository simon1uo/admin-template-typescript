<template>
    <div>404 NOT FOUND</div>
    <el-button @click="handleBackToMainPage"
        ><el-icon><home /></el-icon>返回首页</el-button
    >
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: '404',
    setup() {
        const router = useRouter()
        const handleBackToMainPage = () => {
            router.push('/main')
        }
        return {
            handleBackToMainPage
        }
    }
})
</script>

<style lang="less" scoped></style>
