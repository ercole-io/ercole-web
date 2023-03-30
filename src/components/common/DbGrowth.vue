<template>
  <div>
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
      totalRange="31"
      class="mt-0 mr-0"
      v-if="showRangeDate"
    />
    <LineChart
      :chartId="dataID"
      :lineChartData="mountDbGrowthChart(data)"
      class="mt-5"
    />
  </div>
</template>

<script>
import DbGrowthMixin from '@/mixins/oracle/dbGrowth.js'

export default {
  mixins: [DbGrowthMixin],
  props: {
    data: {
      type: Array,
      default: null,
    },
    dataID: {
      type: String,
      default: '',
    },
    showRangeDate: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
