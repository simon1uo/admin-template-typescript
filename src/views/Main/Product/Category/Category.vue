<template>
    <div class="category">
        <PageSearch
            :search-form-config="categorySearchFormConfig"
            @resetBtnClick="handleResetClick"
            @queryBtnClick="handleQueryClick"
        />
        <PageContent
            page-name="category"
            ref="pageContentRef"
            :content-table-config="categoryContentTableConfig"
            @createBtnClick="handleCreateData"
            @editBtnClick="handleEditData"
        />
        <PageModal
            page-name="category"
            ref="pageModalRef"
            :modal-config="categoryModalConfig"
            :default-info="defaultInfo"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/PageSearch/src/PageSearch.vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'
import PageModal from '@/components/PageModal/src/PageModal.vue'

import { categorySearchFormConfig } from './config/searchForm.config.js'
import { categoryContentTableConfig } from './config/contentTable.config'
import { categoryModalConfig } from './config/modal.config'

import { usePageSearch } from '@/hook/usePageSearch'
import { usePageModal } from '@/hook/usePageModal'

export default defineComponent({
    name: 'Category',
    components: { PageModal, PageSearch, PageContent },
    setup() {
        const [pageContentRef, handleResetClick, handleQueryClick] =
            usePageSearch()

        const [pageModalRef, defaultInfo, handleCreateData, handleEditData] =
            usePageModal()

        return {
            categorySearchFormConfig,
            categoryContentTableConfig,
            categoryModalConfig,
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
