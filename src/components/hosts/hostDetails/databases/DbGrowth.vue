<template>
  <LineChart :chartId="growthId" :lineChartData="chartData" />
</template>

<script>
import LineChart from '@/components/common/charts/LineChart.vue'
import _ from 'lodash'
import moment from 'moment'

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
    LineChart
  },
  data() {
    return {
      chartData: []
    }
  },
  beforeMount() {
    this.mountDbGrowthChart()
  },
  methods: {
    mountDbGrowthChart() {
      let datafile = _.map(this.growth, val => {
        const { datafileSize, updated } = val
        return {
          date: moment(updated).format('YYYY-MM-DD'),
          value: datafileSize
        }
      })

      const datafileResult = {}
      for (const prop in datafile) {
        datafileResult[datafile[prop].date] = datafile[prop].value
      }

      let segments = _.map(this.growth, val => {
        const { segmentsSize, updated } = val
        return {
          date: moment(updated).format('YYYY-MM-DD'),
          value: segmentsSize
        }
      })

      const segmentsResult = {}
      for (const prop in segments) {
        segmentsResult[segments[prop].date] = segments[prop].value
      }

      this.chartData.push(
        { name: 'Datafile Size', data: datafileResult },
        { name: 'Segments Size', data: segmentsResult }
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
