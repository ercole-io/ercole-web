<template>
  <BoxContent title="Patching" border>
    <BarChart
      chartId="patchingChart"
      :barChartData="engineeredSystems.patching"
      chartHeight="90px"
      :colors="[['rgb(87, 117, 144)', 'rgb(67, 170, 139)']]"
      :legend="false"
    />
  </BoxContent>
</template>

<script>
import { mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import BarChart from '@/components/common/charts/BarChart.vue'

export default {
  components: {
    BoxContent,
    BarChart
  },
  computed: {
    ...mapState(['engineeredSystems'])
  }
}
</script>

<style lang="scss" scoped></style>
