<template>
    <div class="overview">
        <Card title="About">
            <div class="text-left">
                🎮 admin-tmeplate 基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
                、TypeScript、Echart5.
            </div>
        </Card>

        <Card title="技术栈">
            <TextLink :text-arrs="technologyStacks" />
            <TextDescriptions
                title="生产环境依赖"
                :column="2"
                :table-datas="dependencies"
            />
            <TextDescriptions
                title="开发环境依赖"
                :column="2"
                :table-datas="devDependencies"
            />
        </Card>
    </div>
</template>

<script lang="ts" setup>
import Card from '@/base-ui/Card/src/Card.vue'
import TextLink from './components/TextLink.vue'
import TextDescriptions from './components/TextDescriptions.vue'

import { technologyStacks } from '@/views/Main/Analysis/Overview/config/technology-stack'
import { dependencies } from './config/dependencies'
import { devDependencies } from './config/dev-dependencies'
</script>

<style scoped lang="less">
.overview {
    .c-left {
        text-align: left;
    }

    .description {
        // ::v-deep 重写 element-plus 样式
        &:deep(.el-descriptions__title) {
            // ::v-deep .el-descriptions__title {
            font-weight: 400;
        }
    }
}
</style>
