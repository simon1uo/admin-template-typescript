<template>
    <div class="category">
        <PageContent
            page-name="category"
            :content-table-config="categoryContentTableConfig"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'
import { categoryContentTableConfig } from './config/contentTable.config'
export default defineComponent({
    name: 'Category',
    components: { PageContent },
    setup() {
        return { categoryContentTableConfig }
    }
})
</script>

<style scoped></style>
