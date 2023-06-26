<template>
  <b-tab-item label="Capacity 2">
    <BoxContent border title="CPU Database">
      <apex-chart
        type="bar"
        height="300"
        width="100%"
        :options="chartOptions"
        :series="series"
        id="demoChart"
      />
    </BoxContent>
  </b-tab-item>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  name: 'hosts-details-oracle-databases-patches-component',
  props: {
    capacity: {
      type: Array,
      default: null,
    },
  },
  components: {
    BoxContent,
  },
  data: () => {
    return {
      series: [
        {
          name: 'Average',
          data: [
            {
              x: 'Month',
              y: 1292,
              goals: [
                {
                  name: 'Max',
                  value: 1400,
                  strokeHeight: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Week 1',
              y: 4432,
              goals: [
                {
                  name: 'Max',
                  value: 5400,
                  strokeHeight: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Week 2',
              y: 5423,
              goals: [
                {
                  name: 'Max',
                  value: 5200,
                  strokeHeight: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Week 3',
              y: 6653,
              goals: [
                {
                  name: 'Max',
                  value: 6500,
                  strokeHeight: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Week 4',
              y: 8133,
              goals: [
                {
                  name: 'Max',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 1',
              y: 7132,
              goals: [
                {
                  name: 'Max',
                  value: 7500,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 2',
              y: 7332,
              goals: [
                {
                  name: 'Max',
                  value: 8700,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 3',
              y: 6553,
              goals: [
                {
                  name: 'Max',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 4',
              y: 6553,
              goals: [
                {
                  name: 'Max',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 5',
              y: 6553,
              goals: [
                {
                  name: 'Max',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 6',
              y: 6553,
              goals: [
                {
                  name: 'Max',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
            {
              x: 'Day 7',
              y: 6553,
              goals: [
                {
                  name: 'Max',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            },
          ],
        },
      ],
      legend: {
        show: true,
      },
      chartOptions: {
        chart: {
          id: 'demoChart',
        },
        xaxis: {
          labels: {
            style: {
              colors: ['red', 'green', 'blue'],
            },
          },
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
