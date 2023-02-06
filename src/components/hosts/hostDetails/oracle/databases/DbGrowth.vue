<template>
  <b-tab-item label="DB Growth">
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
      totalRange="31"
      class="mt-0 mr-0"
    />
    <LineChart
      chartId="growthId"
      :lineChartData="mountDbGrowthChart(growth)"
      class="mt-5"
    />
  </b-tab-item>
</template>

<script>
import DbGrowthMixin from '@/mixins/oracle/dbGrowth.js'

export default {
  name: 'hosts-details-oracle-databases-growth-component',
  mixins: [DbGrowthMixin],
  props: {
    growth: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
