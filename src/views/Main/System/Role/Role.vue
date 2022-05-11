<template>
    <div class="role">
        <PageSearch
            :search-form-config="roleSearchFormConfig"
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <PageContent
            page-name="role"
            ref="pageContentRef"
            :content-table-config="roleContentTableConfig"
            @createBtnClick="handleCreateData"
            @editBtnClick="handleEditData"
        />
        <PageModal
            page-name="role"
            ref="pageModalRef"
            :modal-config="roleModalConfig"
            :default-info="defaultInfo"
            :other-info="otherInfo"
        >
            <div class="menu-tree">
                <el-tree
                    ref="elTreeRef"
                    :data="roleMenus"
                    :props="{ children: 'children', label: 'name' }"
                    show-checkbox
                    node-key="id"
                    @check="handleCheckChange"
                />
            </div>
        </PageModal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'

import PageSearch from '@/components/PageSearch/src/PageSearch.vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'
import PageModal from '@/components/PageModal/src/PageModal.vue'

import { roleSearchFormConfig } from './config/searchForm.config'
import { roleContentTableConfig } from './config/contentTable.config'
import { roleModalConfig } from './config/modal.config'

import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModal } from '@/hook/usePageModal'
import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
import { useStore } from '@/store'

export default defineComponent({
    name: 'Role',
    components: { PageModal, PageSearch, PageContent },
    setup() {
        const [pageContentRef, handleResetClick, handleQueryClick] =
            usePageSearch()

        // 处理pageModal的hook
        const elTreeRef = ref<InstanceType<typeof ElTree>>()
        const editCallback = (item: any) => {
            const leafKeys = getMenuLeafKeys(item.menuList)
            nextTick(() => {
                elTreeRef.value?.setCheckedKeys(leafKeys, false)
            })
        }

        const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
            usePageModal(undefined, editCallback)

        const store = useStore()
        store.dispatch('loadLocalEntireList')
        const roleMenus = computed(() => store.state.entireRoleMenu)
        const otherInfo = ref({})
        const handleCheckChange = (data1: any, data2: any) => {
            const checkedKeys = data2.checkedKeys
            const halfCheckedKeys = data2.halfCheckedKeys
            const menuList = [...checkedKeys, ...halfCheckedKeys]
            otherInfo.value = { menuList }
        }

        return {
            roleSearchFormConfig,
            roleContentTableConfig,
            roleModalConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            pageModalRef,
            defaultInfo,
            handleCreateData,
            handleEditData,
            roleMenus,
            otherInfo,
            handleCheckChange,
            elTreeRef
        }
    }
})
</script>

<style scoped></style>
