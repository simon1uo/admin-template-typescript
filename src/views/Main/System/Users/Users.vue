<template>
    <div class="users">
        <PageSearch
            :search-form-config="usersSearchFormConfig"
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <PageContent
            :content-table-config="usersContentTableConfig"
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
            :modal-config="computedModalConfig"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/PageSearch/'
import PageContent from '@/components/PageContent/'
import PageModal from '@/components/PageModal/'

import { usersSearchFormConfig } from './config/searchForm.config'
import { usersContentTableConfig } from './config/contentTable.config'
import { usersModalConfig } from './config/modal.config'

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
            const passwordItem = usersModalConfig.formItems.find(
                (item) => item.field === 'password'
            )
            passwordItem!.isHidden = false
        }

        const editCallback = () => {
            const passwordItem = usersModalConfig.formItems.find(
                (item) => item.field === 'password'
            )
            passwordItem!.isHidden = true
        }

        // 动态添加部门、角色列表
        const store = useStore()
        store.dispatch('loadLocalEntireList')
        // 使用computed转换为一个响应的配置，组件绑定为该配置
        const computedModalConfig = computed(() => {
            const departmentItem = usersModalConfig.formItems.find(
                (item) => item.field === 'departmentId'
            )
            departmentItem!.options = store.state.entireDepartment.map(
                (item: any) => {
                    return { title: item.name, value: item.id }
                }
            )
            const roleItem = usersModalConfig.formItems.find(
                (item) => item.field === 'roleId'
            )
            roleItem!.options = store.state.entireRole.map((item: any) => {
                return { title: item.name, value: item.id }
            })
            return usersModalConfig
        })

        const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
            usePageModal(createCallback, editCallback)

        return {
            usersSearchFormConfig,
            usersContentTableConfig,
            usersModalConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            pageModalRef,
            computedModalConfig,
            defaultInfo,
            handleCreateData,
            handleEditData
        }
    }
})
</script>

<style scoped></style>
