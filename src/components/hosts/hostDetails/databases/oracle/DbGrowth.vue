<template>
  <b-tab-item label="DB Growth" v-if="growth.length > 0">
    <RangeDates :setRange="SET_RANGE_DATES_ALT" class="mt-0 mr-0" />
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
import { setRangeDateFormat, checkRangeDate } from '@/helpers/helpers.js'
import LineChart from '@/components/common/charts/LineChart.vue'
import RangeDates from '@/components/common/RangeDates.vue'

export default {
  props: {
    growthId: {
      type: String,
      required: true
    },
    growth: {
      type: Array,
      default: null
    }
  },
  components: {
    LineChart,
    RangeDates
  },
  data() {
    return {
      chartData: [],
      dynamicType: null
    }
  },
  methods: {
    ...mapMutations(['SET_RANGE_DATES_ALT']),
    calcDatafileSize() {
      const datafile = []

      _.map(this.growth, val => {
        const { datafileSize, updated } = val
        let date = setRangeDateFormat(updated)

        if (checkRangeDate(date, this.rangeDates.rangeDatesAlt)) {
          datafile.push({
            date: moment(updated).format('ll'),
            value: datafileSize
          })
        }
      })

      _.reverse(datafile)

      return this.mountFinalData(datafile)
    },
    calcSegmentsSize() {
      const segments = []

      _.map(this.growth, val => {
        const { segmentsSize, updated } = val
        let date = setRangeDateFormat(updated)

        if (checkRangeDate(date, this.rangeDates.rangeDatesAlt)) {
          segments.push({
            date: moment(updated).format('ll'),
            value: segmentsSize
          })
        }
      })

      _.reverse(segments)

      return this.mountFinalData(segments)
    },
    calcAllocatedSize() {
      const allocated = []

      _.map(this.growth, val => {
        const { allocable, updated } = val
        let date = setRangeDateFormat(updated)

        if (checkRangeDate(date, this.rangeDates.rangeDatesAlt)) {
          allocated.push({
            date: moment(updated).format('ll'),
            value: allocable
          })
        }
      })

      _.reverse(allocated)

      return this.mountFinalData(allocated)
    },
    mountFinalData(result) {
      const finalResult = {}
      for (const prop in result) {
        finalResult[result[prop].date] = result[prop].value
      }

      return finalResult
    }
  },
  computed: {
    ...mapState(['rangeDates']),
    mountDbGrowthChart() {
      return [
        { name: 'Datafile Size', data: this.calcDatafileSize() },
        { name: 'Segments Size', data: this.calcSegmentsSize() },
        { name: 'Allocable Size', data: this.calcAllocatedSize() }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
