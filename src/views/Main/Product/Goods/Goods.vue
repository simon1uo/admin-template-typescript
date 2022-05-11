<template>
    <div class="goods">
        <PageSearch :search-form-config="goodsSearchFormConfig" />
        <PageContent
            page-name="goods"
            :content-table-config="goodsContentTableConfig"
        >
            <template #image="scope">
                <el-image
                    style="width: 50px; height: 50px"
                    :src="scope.row.imgUrl"
                    :preview-src-list="[scope.row.imgUrl]"
                >
                </el-image>
            </template>
            <template #status="scope">
                <el-button
                    size="small"
                    :type="scope.row.status ? 'success' : 'danger'"
                    >{{ scope.row.status ? '可用' : '禁用' }}</el-button
                >
            </template>
            <template #price="scope">
                {{ '¥' + scope.row.oldPrice }}
            </template>
        </PageContent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/PageSearch/src/PageSearch.vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'

import { goodsSearchFormConfig } from './config/searchForm.config'
import { goodsContentTableConfig } from './config/contentTable.config'

export default defineComponent({
    name: 'Goods',
    components: { PageContent, PageSearch },
    setup() {
        return { goodsSearchFormConfig, goodsContentTableConfig }
    }
})
</script>

<style scoped></style>
