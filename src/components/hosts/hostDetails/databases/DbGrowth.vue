<template>
  <LineChart :chartId="growthId" :lineChartData="chartData" discrete />
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
      chartData: [],
      dynamicType: null
    }
  },
  beforeMount() {
    this.mountDbGrowthChart()
  },
  methods: {
    calcDatafileSize() {
      let datafile = _.map(this.growth, val => {
        const { datafileSize, updated } = val
        return {
          date: moment(updated).format('ll'),
          value: datafileSize
        }
      })

      return this.mountFinalData(datafile)
    },
    calcSegmentsSize() {
      let segments = _.map(this.growth, val => {
        const { segmentsSize, updated } = val
        return {
          date: moment(updated).format('ll'),
          value: segmentsSize
        }
      })

      return this.mountFinalData(segments)
    },
    calcAllocatedSize() {
      let allocated = _.map(this.growth, val => {
        const { allocable, updated } = val
        return {
          date: moment(updated).format('ll'),
          value: allocable
        }
      })

      return this.mountFinalData(allocated)
    },
    mountFinalData(result) {
      const finalResult = {}
      for (const prop in result) {
        finalResult[result[prop].date] = result[prop].value
      }

      return finalResult
    },
    mountDbGrowthChart() {
      this.chartData.push(
        { name: 'Datafile Size', data: this.calcDatafileSize() },
        { name: 'Segments Size', data: this.calcSegmentsSize() },
        { name: 'Allocable Size', data: this.calcAllocatedSize() }
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
