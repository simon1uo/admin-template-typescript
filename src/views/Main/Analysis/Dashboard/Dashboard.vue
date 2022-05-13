<template>
    <div class="dashboard">
        <el-row :gutter="10">
            <el-col :span="7">
                <Card title="分类商品数量">
                    <PieChart :pie-data="categoryGoodsCount" />
                </Card>
            </el-col>
            <el-col :span="10">
                <Card title="不同城市商品销量">
                    <MapChart :map-data="addressGoodsSale" />
                </Card>
            </el-col>
            <el-col :span="7">
                <Card title="分类商品数量">
                    <RoseChart :rose-data="categoryGoodsCount" />
                </Card>
            </el-col>
        </el-row>

        <el-row :gutter="10" class="content-row">
            <el-col :span="12">
                <Card title="分类商品的销量">
                    <LineChart v-bind="categoryGoodsSale" />
                </Card>
            </el-col>
            <el-col :span="12">
                <Card title="分类商品的收藏">
                    <BarChart v-bind="categoryGoodsFavor" />
                </Card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import Card from '@/base-ui/Card'
import PieChart from '@/components/PageChart/'
import LineChart from '@/components/PageChart/'
import RoseChart from '@/components/PageChart/'
import BarChart from '@/components/PageChart/'
import MapChart from '@/components/PageChart/'

export default defineComponent({
    name: 'Dashboard',
    components: { Card, PieChart, RoseChart, LineChart, BarChart, MapChart },
    setup() {
        const store = useStore()
        store.dispatch('dashboard/getDashboardDataAction')

        const categoryGoodsCount = computed(() => {
            return store.state.dashboard.categoryGoodsCount.map((item: any) => {
                return { name: item.name, value: item.goodsCount }
            })
        })

        const categoryGoodsSale = computed(() => {
            const xLabels: string[] = []
            const values: any[] = []

            const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
            for (const item of categoryGoodsSale) {
                xLabels.push(item.name)
                values.push(item.goodsCount)
            }
            return { xLabels, values }
        })

        const categoryGoodsFavor = computed(() => {
            const xLabels: string[] = []
            const values: any[] = []

            const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
            for (const item of categoryGoodsFavor) {
                xLabels.push(item.name)
                values.push(item.goodsFavor)
            }
            return { xLabels, values }
        })

        const addressGoodsSale = computed(() => {
            return store.state.dashboard.addressGoodsSale.map(
                (item: { address: any; count: any }) => ({
                    name: item.address,
                    value: item.count
                })
            )
        })

        return {
            categoryGoodsCount,
            categoryGoodsSale,
            categoryGoodsFavor,
            addressGoodsSale
        }
    }
})
</script>

<style scoped>
.content-row {
    margin-top: 10px;
}
</style>
