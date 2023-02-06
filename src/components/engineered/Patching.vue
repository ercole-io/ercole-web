<template>
  <BoxContent title="Patching" border :mbottom="false">
    <GhostLoading :isLoading="loadingTableStatus" setHeight="110">
      <BarChart
        chartId="patchingChart"
        :barChartData="getPatchingChartData"
        chartHeight="110px"
        stacked
      />
    </GhostLoading>
  </BoxContent>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import BarChart from '@/components/common/charts/BarChart.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'engineered-patching-component',
  components: {
    BoxContent,
    BarChart,
    GhostLoading,
  },
  computed: {
    ...mapState(['engineeredSystems']),
    ...mapGetters(['getPatchingChartData', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
