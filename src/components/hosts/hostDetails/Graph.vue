<template>
  <div class="chart-space">
    <LineChart chartId="lineChart" :lineChartData="chartData" />
    <!-- <BarChart chartId="barChart" :barChartData="barData" stacked />
    <ColumnChart chartId="columnChart" :columnChartData="columnData" stacked /> -->
  </div>
</template>

<script>
import LineChart from '@/components/common/charts/LineChart.vue'
// import BarChart from '@/components/common/charts/BarChart.vue'
// import ColumnChart from '@/components/common/charts/ColumnChart.vue'

export default {
  props: ['chartData'],
  components: {
    LineChart
    // BarChart,
    // ColumnChart
  },
  data() {
    return {
      lineData: [
        {
          name: 'Workout',
          data: {
            '2013-02-17': 3,
            '2013-02-24': 3,
            '2013-03-03': 1,
            '2013-03-10': 4,
            '2013-03-17': 3,
            '2013-03-24': 2,
            '2013-03-31': 3
          }
        },
        {
          name: 'Go to concert',
          data: {
            '2013-02-10': 0,
            '2013-02-17': 0,
            '2013-02-24': 0,
            '2013-03-03': 0,
            '2013-03-10': 2,
            '2013-03-17': 1,
            '2013-03-24': 0
          }
        }
      ],
      barData: [
        {
          name: 'Series A',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        },
        {
          name: 'Series B',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        },
        {
          name: 'Series C',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        },
        {
          name: 'Series D',
          data: [
            ['Type 1', 32],
            ['Type 2', 46],
            ['Type 3', 28],
            ['Type 4', 21],
            ['Type 5', 20],
            ['Type 6', 13]
          ]
        }
      ],
      columnData: [
        {
          name: 'Series A',
          data: [
            ['0', 32],
            ['1', 46],
            ['2', 28],
            ['3', 21],
            ['4', 20],
            ['5', 13],
            ['6', 27]
          ]
        },
        {
          name: 'Series B',
          data: [
            ['0', 32],
            ['1', 46],
            ['2', 28],
            ['3', 21],
            ['4', 20],
            ['5', 13],
            ['6', 27]
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-space {
  padding-top: 22px;
}
</style>
