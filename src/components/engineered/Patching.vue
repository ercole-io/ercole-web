<template>
  <BoxContent title="Patching" border :mbottom="false">
    <BarChart
      chartId="patchingChart"
      :barChartData="getPatchingChartData"
      chartHeight="110px"
      stacked
    />
  </BoxContent>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  components: {
    BoxContent,
    BarChart
  },
  computed: {
    ...mapState(['engineeredSystems']),
    ...mapGetters(['getPatchingChartData'])
  }
}
</script>

<style lang="scss" scoped></style>
