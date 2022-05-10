<template>
    <div class="nav-header">
        <el-icon :size="20" style="cursor: pointer">
            <component
                :is="isFold ? 'fold' : 'expand'"
                @click="handleFoldClick"
            />
        </el-icon>
        <div class="nav-header-content">
            <div class="breads"><span>breads</span></div>
            <NavUserInfo />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavUserInfo from './NavUserInfo.vue'

export default defineComponent({
    name: 'NavHeader',
    components: { NavUserInfo },
    emits: ['foldChange'],
    setup(props, { emit }) {
        const isFold = ref(false)

        const handleFoldClick = () => {
            isFold.value = !isFold.value
            emit('foldChange', isFold.value)
        }
        return {
            isFold,
            handleFoldClick
        }
    }
})
</script>

<style lang="less" scoped>
.nav-header {
    display: flex;
    width: 100%;
    align-items: center;
    .nav-header-content {
        display: flex;
        flex: 1;
        padding: 0 22px;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
