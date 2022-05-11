<template>
    <div class="page-search">
        <InputForm v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <h1 class="header">查找</h1>
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button type="primary" @click="handleQueryClick">
                        <el-icon><search /></el-icon>搜索
                    </el-button>
                    <el-button type="primary" @click="handleResetClick">
                        <el-icon><refresh /></el-icon>重置
                    </el-button>
                </div>
            </template>
        </InputForm>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputForm from '@/base-ui/InputForm/'

export default defineComponent({
    name: 'PageSearch',
    components: { InputForm },
    props: {
        searchFormConfig: {
            type: Object,
            required: true
        }
    },
    emits: ['resetBtnClick', 'queryBtnClick'],
    setup(props, { emit }) {
        // 通过双向绑定的属性应该由配置文件决定
        // formData应该由服务器数据动态决定
        const formItems = props.searchFormConfig?.formItem ?? []
        const formOriginData: any = {}
        for (const item of formItems) {
            formOriginData[item.field] = '' // 元内容保存为空字符串
        }
        const formData = ref(formOriginData)

        const handleResetClick = () => {
            formData.value = formOriginData
            /*for (const key in formOriginData) {
              formData.value[`${key}`] = formOriginData[key]
            }*/
            emit('resetBtnClick')
        }

        // 搜索按钮
        const handleQueryClick = () => {
            emit('queryBtnClick', formData.value)
        }
        return {
            formData,
            handleResetClick,
            handleQueryClick
        }
    }
})
</script>

<style lang="less" scoped>
.handle-btns {
    text-align: right;
    padding: 10px;
}
</style>
