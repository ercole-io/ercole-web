<template>
  <BarChart
    chartId="oracleCharts"
    :barChartData="getOracleChartsData"
    chartHeight="250px"
    stacked
    :legend="false"
    :xAxesConfig="[true, 'top']"
    :barThickness="50"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  components: {
    BarChart
  },
  computed: {
    ...mapGetters(['getOracleChartsData'])
  }
}
</script>

<style lang="scss" scoped></style>
