<template>
  <GhostLoading :isLoading="loadingTableStatus" setWidth="292" setHeight="250">
    <BarChart
      chartId="oracleCharts"
      :barChartData="getOracleChartsData"
      chartHeight="250px"
      stacked
      :legend="false"
      :xAxesConfig="[true, 'top']"
      :barThickness="50"
    />
  </GhostLoading>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/common/charts/BarChart.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    BarChart,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['getOracleChartsData', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
