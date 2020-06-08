<template>
  <LineChart chartId="dbGrowth" :lineChartData="lineData" />
</template>

<script>
import LineChart from '@/components/common/charts/LineChart.vue'

export default {
  props: {
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
      lineData: [
        {
          name: 'Value 1',
          data: {
            '2013-02-10': 30,
            '2013-02-17': 30,
            '2013-02-24': 30,
            '2013-03-03': 10,
            '2013-03-10': 40,
            '2013-03-17': 30,
            '2013-03-24': 20,
            '2013-03-31': 30
          }
        },
        {
          name: 'Value 2',
          data: {
            '2013-02-10': 0,
            '2013-02-17': 10,
            '2013-02-24': 0,
            '2013-03-03': 50,
            '2013-03-10': 20,
            '2013-03-17': 10,
            '2013-03-24': 0,
            '2013-03-31': 70
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
