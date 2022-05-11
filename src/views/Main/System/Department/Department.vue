<template>
    <div class="department">
        <PageContent
            page-name="department"
            :content-table-config="departmentContentTableConfig"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/PageContent/src/PageContent.vue'
import { departmentContentTableConfig } from './config/contentTable.config'

export default defineComponent({
    name: 'Department',
    components: { PageContent },
    setup() {
        return { departmentContentTableConfig }
    }
})
</script>

<style scoped></style>
