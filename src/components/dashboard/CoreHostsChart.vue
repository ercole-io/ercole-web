<template>
  <div>
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
      totalRange="31"
      class="mt-0 mb-4"
    />
    <LineChart
      chartId="coreHostsChart"
      :hasLegend="false"
      :lineChartData="getChartCoreHosts"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import LineChart from '@/components/common/charts/LineChart.vue'
import RangeDates from '@/components/common/RangeDates.vue'

export default {
  components: {
    LineChart,
    RangeDates
  },
  async beforeMount() {
    await this.getCoreHosts()

    this.getChartCoreHosts
  },
  methods: {
    ...mapActions(['getCoreHosts']),
    ...mapMutations(['SET_RANGE_DATES_ALT'])
  },
  computed: {
    ...mapGetters(['getChartCoreHosts'])
  }
}
</script>

<style lang="scss" scoped></style>
