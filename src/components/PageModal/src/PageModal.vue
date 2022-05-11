<template>
    <div class="page-modal">
        <el-dialog
            v-model="dialogVisible"
            :title="title"
            width="30%"
            center
            destroy-on-close
        >
            <InputForm v-bind="modalConfig" v-model="formData" />
            <slot></slot>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false"> 取消 </el-button>
                    <el-button type="primary" @click="handleConfirmClick">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import InputForm from '@/base-ui/InputForm/'

export default defineComponent({
    name: 'PageModal',
    components: { InputForm },
    props: {
        modalConfig: {
            type: Object,
            required: true
        },
        defaultInfo: {
            type: Object,
            default: () => ({})
        },
        pageName: {
            type: String,
            required: true
        },
        otherInfo: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const title = ref('')
        const dialogVisible = ref(false)
        const formData = ref<any>({})

        watch(
            () => props.defaultInfo,
            (newValue) => {
                for (const item of props.modalConfig.formItems) {
                    formData.value[`${item.field}`] = newValue[`${item.field}`]
                }
            }
        )

        const store = useStore()
        const handleConfirmClick = () => {
            dialogVisible.value = false
            if (Object.keys(props.defaultInfo).length) {
                // 有内容则为编辑
                store.dispatch('pageData/editPageDataAction', {
                    pageName: props.pageName,
                    editData: { ...formData.value, ...props.otherInfo },
                    id: props.defaultInfo.id
                })
            } else {
                // 无内容则为新建
                store.dispatch('pageData/createPageDataAction', {
                    pageName: props.pageName,
                    newData: { ...formData.value, ...props.otherInfo }
                })
            }
        }
        return {
            title,
            dialogVisible,
            formData,
            handleConfirmClick
        }
    }
})
</script>

<style lang="less" scoped></style>
