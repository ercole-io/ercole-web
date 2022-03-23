<template>
  <GhostLoading :isLoading="loadingTableStatus" setHeight="500">
    <BarChart
      :chartId="id"
      :barChartData="getDatabasesCharts"
      :chartHeight="chartHeight"
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
