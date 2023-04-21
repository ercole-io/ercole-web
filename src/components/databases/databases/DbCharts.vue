<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="490">
    <BarChart
      :chartId="id"
      :barChartData="getDatabasesCharts"
      chartHeight="490px"
      stacked
      :legend="false"
      :xAxesConfig="xAxesConfig"
      :barThickness="70"
    />
  </GhostLoading>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/common/charts/BarChart.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'databases-databases-charts-component',
  props: {
    id: {
      type: String,
      required: true,
    },
    xAxesConfig: {
      type: Array,
    },
    chartHeight: {
      type: String,
    },
  },
  components: {
    BarChart,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['getDatabasesCharts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
