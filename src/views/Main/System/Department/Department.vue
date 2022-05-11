<template>
    <div class="department">
        <PageSearch
            :search-form-config="departmentSearchFormConfig"
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <PageContent
            page-name="department"
            ref="pageContentRef"
            :content-table-config="departmentContentTableConfig"
            @createBtnClick="handleCreateData"
            @editBtnClick="handleEditData"
        />
        <PageModal
            page-name="department"
            ref="pageModalRef"
            :modal-config="departmentModalConfig"
            :default-info="defaultInfo"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/PageSearch/src/PageSearch.vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'
import PageModal from '@/components/PageModal/src/PageModal.vue'

import { departmentSearchFormConfig } from './config/searchForm.config.js'
import { departmentContentTableConfig } from './config/contentTable.config'
import { departmentModalConfig } from './config/modal.config'

import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModal } from '@/hook/usePageModal'

export default defineComponent({
    name: 'Department',
    components: { PageModal, PageSearch, PageContent },
    setup() {
        const [pageContentRef, handleResetClick, handleQueryClick] =
            usePageSearch()

        const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
            usePageModal()

        return {
            departmentSearchFormConfig,
            departmentContentTableConfig,
            departmentModalConfig,
            pageContentRef,
            handleResetClick,
            handleQueryClick,
            pageModalRef,
            defaultInfo,
            handleCreateData,
            handleEditData
        }
    }
})
</script>

<style scoped></style>
