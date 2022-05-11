<template>
    <div class="menu">
        <PageContent
            page-name="menu"
            :content-table-config="menuContentTableConfig"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/PageContent/src/PageContent.vue'

import { menuContentTableConfig } from './config/contentTable.config'

export default defineComponent({
    name: 'Menu',
    components: { PageContent },
    setup() {
        return { menuContentTableConfig }
    }
})
</script>

<style scoped></style>
