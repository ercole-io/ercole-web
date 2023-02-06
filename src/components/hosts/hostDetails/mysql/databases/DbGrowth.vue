<template>
  <b-tab-item label="DB Growth" v-if="growth && growth.length > 0">
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
      totalRange="31"
      class="mt-0 mr-0"
    />
    <LineChart
      :chartId="growthId"
      :lineChartData="mountDbGrowthChart"
      class="mt-5"
    />
  </b-tab-item>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapMutations, mapState } from 'vuex'
import {
  setRangeDateFormat,
  checkRangeDate,
  getKeyValuePair,
} from '@/helpers/helpers.js'
import LineChart from '@/components/common/charts/LineChart.vue'
import RangeDates from '@/components/common/RangeDates.vue'

export default {
  name: 'hosts-details-mysql-databases-growth-component',
  props: {
    growthId: {
      type: String,
      required: true,
    },
    growth: {
      type: Array,
      default: null,
    },
  },
  components: {
    LineChart,
    RangeDates,
  },
  data() {
    return {
      chartData: [],
    }
  },
  methods: {
    ...mapMutations(['SET_RANGE_DATES_ALT']),
    calcAllocatedSize() {
      const allocated = []

      _.map(this.growth, (val) => {
        const { allocation, updated } = val
        let date = setRangeDateFormat(updated)

        if (checkRangeDate(date, this.rangeDates.rangeDatesAlt)) {
          allocated.push({
            date: moment(updated).format('ll'),
            value: allocation,
          })
        }
      })

      _.reverse(allocated)

      return getKeyValuePair(allocated, 'date', 'value')
    },
  },
  computed: {
    ...mapState(['rangeDates']),
    mountDbGrowthChart() {
      return [{ name: 'Allocation Size', data: this.calcAllocatedSize() }]
    },
  },
}
</script>

<style lang="scss" scoped></style>
