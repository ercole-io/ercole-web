<template>
  <b-tab-item label="Capacity" value="Capacity">
    <BoxContent border title="CPU Database">
      <apex-chart
        type="bar"
        height="300"
        width="100%"
        :options="chartOptions"
        :series="cpuCapacitySeries"
        id="cpuCapacityChart"
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
  // beforeMount() {
  //   console.log(this.capacity)
  // },
  data: () => {
    return {
      monthColor: 'rgb(87, 117, 144)',
      weekColor: 'rgb(67, 170, 139)',
      dayColor: 'rgba(153, 102, 255)',
      maxColor: 'rgb(249, 65, 68)',
    }
  },
  computed: {
    chartOptions() {
      return {
        // yaxis: {
        //   labels: {
        //     formatter: function (value) {
        //       return value + ' GB'
        //     },
        //   },
        // },
        xaxis: {
          // labels: {
          //   formatter: function (value) {
          //     return value
          //   },
          // },
          group: {
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
            },
            groups: [
              { title: 'Month', cols: 1 },
              { title: 'Weeks', cols: 4 },
              { title: 'Days', cols: 7 },
            ],
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#333'],
            fontSize: '12px',
            fontWeight: 'bold',
          },
          // dropShadow: {
          //   enabled: true,
          //   left: 2,
          //   top: 2,
          //   opacity: 0.5,
          // },
          background: {
            enabled: true,
            foreColor: '#fff',
            borderRadius: 4,
            padding: 3,
            opacity: 0.7,
            borderWidth: 1,
            borderColor: '#fff',
          },
          offsetX: 0,
          offsetY: 0,
        },
        grid: {
          position: 'back',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'bottom',
            },
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Month Avg', 'Week Avg', 'Day Avg', 'Max'],
          markers: {
            fillColors: [
              this.monthColor,
              this.weekColor,
              this.dayColor,
              this.maxColor,
            ],
          },
          onItemClick: {
            toggleDataSeries: false,
          },
        },
      }
    },
    cpuCapacitySeries() {
      return [
        {
          name: 'Average',
          data: [
            {
              x: 'M',
              y: this.capacity[0].cpuDbAvg,
              fillColor: this.monthColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[0].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'W4',
              y: this.capacity[1].cpuDbAvg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[1].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
              tooltip: {
                x: {
                  formatter: (val) => {
                    return `Week ${val}`
                  },
                },
              },
            },
            {
              x: 'W3',
              y: this.capacity[2].cpuDbAvg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[2].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'W2',
              y: this.capacity[3].cpuDbAvg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[3].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'W1',
              y: this.capacity[4].cpuDbAvg,
              fillColor: this.weekColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[4].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D7',
              y: this.capacity[5].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[5].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D6',
              y: this.capacity[6].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[6].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D5',
              y: this.capacity[7].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[7].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D4',
              y: this.capacity[8].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[8].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D3',
              y: this.capacity[9].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[9].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D2',
              y: this.capacity[10].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[10].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
            {
              x: 'D1',
              y: this.capacity[11].cpuDbAvg,
              fillColor: this.dayColor,
              goals: [
                {
                  name: 'Max',
                  value: this.capacity[11].cpuDbMax,
                  strokeHeight: 2,
                  strokeColor: this.maxColor,
                },
              ],
            },
          ],
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
