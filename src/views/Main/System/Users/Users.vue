<template>
    <div class="users">
        <PageSearch
            :search-form-config="searchFormConfig"
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <PageContent
            :content-table-config="contentTableConfig"
            page-name="users"
            ref="pageContentRef"
            @createBtnClick="handleCreateData"
            @editBtnClick="handleEditData"
        >
            <template #enable="scope">
                <el-button
                    size="small"
                    :type="scope.row.enable ? 'success' : 'danger'"
                    >{{ scope.row.enable ? '可用' : '禁用' }}</el-button
                >
            </template>
        </PageContent>
        <PageModal
            ref="pageModalRef"
            page-name="users"
            :default-info="defaultInfo"
            :modal-config="modalConfigComputedRef"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/PageSearch/'
import PageContent from '@/components/PageContent/'
import PageModal from '@/components/PageModal/'

import { searchFormConfig } from './config/searchForm.config'
import { contentTableConfig } from './config/contentTable.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModal } from '@/hook/usePageModal'

export default defineComponent({
    name: 'Users',
    components: { PageModal, PageContent, PageSearch },
    setup() {
        const [pageContentRef, handleResetClick, handleQueryClick] =
            usePageSearch()

        // user页面中独有的回调函数，才传给hook中执行，不传则不执行
        // 处理密码逻辑
        const createCallback = () => {
            const passwordItem = modalConfig.formItems.find(
                (item) => item.field === 'password'
            )
            passwordItem!.isHidden = false
        }

        const editCallback = () => {
            const passwordItem = modalConfig.formItems.find(
                (item) => item.field === 'password'
            )
            passwordItem!.isHidden = true
        }

        // 动态添加部门、角色列表
        const store = useStore()
        // 使用computed转换为一个响应的配置，组件绑定为该配置
        const modalConfigComputedRef = computed(() => {
            const departmentItem = modalConfig.formItems.find(
                (item) => item.field === 'departmentId'
            )
            departmentItem!.options = store.state.entireDepartment.map(
                (item: any) => {
                    return { title: item.name, value: item.id }
                }
            )
            const roleItem = modalConfig.formItems.find(
                (item) => item.field === 'roleId'
            )
            roleItem!.options = store.state.entireRole.map((item: any) => {
                return { title: item.name, value: item.id }
            })
            return modalConfig
        })

        const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
            usePageModal(createCallback, editCallback)

        return {
            searchFormConfig,
            contentTableConfig,
            modalConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            pageModalRef,
            modalConfigComputedRef,
            defaultInfo,
            handleCreateData,
            handleEditData
        }
    }
})
</script>

<style scoped></style>
