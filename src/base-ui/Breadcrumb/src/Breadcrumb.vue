<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <template v-for="item in breadcrumbItems" :key="item.name">
                <el-breadcrumb-item :to="{ path: item.path }">
                    {{ item.name }}
                </el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '@/base-ui/Breadcrumb'

export default defineComponent({
    name: 'Breadcrumb',
    props: {
        breadcrumbItems: {
            default: () => [],
            type: Array as PropType<IBreadcrumb[]>
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped></style>
