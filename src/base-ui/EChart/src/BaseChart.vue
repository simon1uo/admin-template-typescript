<template>
    <div class="base-chart">
        <div ref="echartDivRef" :style="{ width, height }"></div>
    </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, onMounted, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hook/useEchart'

// 定义props
const props = withDefaults(
    defineProps<{
        options: EChartsOption
        width?: string
        height?: string
    }>(),
    {
        width: '100%',
        height: '360px'
    }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
    const { setOptions } = useEchart(echartDivRef.value!)
    watchEffect(() => {
        setOptions(props.options)
    })
})
</script>

<style lang="less" scoped>
.base-chart {
    height: 100%;
    width: 100%;
}
</style>
