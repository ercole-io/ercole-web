<template>
  <bar-chart
    :id="chartId"
    :data="barChartData"
    :dataset="dataset"
    :download="{ background: '#fff' }"
    :stacked="stacked"
    :colors="colors"
    :legend="legend"
    :messages="{ empty: 'No data' }"
    :style="{ height: chartHeight, lineHeight: chartHeight }"
    :library="library"
  />
</template>

<script>
export default {
  props: {
    chartId: {
      type: String,
      required: true,
    },
    barChartData: {
      type: Array || Object,
      required: true,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    legend: {
      type: [Boolean, String],
      default: 'bottom',
    },
    colors: {
      type: Array,
    },
    chartHeight: {
      type: String,
      default: '300px',
    },
    xAxesConfig: {
      type: Array,
      default: () => [true, 'bottom'],
    },
    barThickness: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    dataset() {
      return {
        barThickness: this.barThickness,
        maxBarThickness: 100,
        borderColor: [],
        // minBarLength: 10,
      }
    },
    library() {
      return {
        responsive: true,
        scales: {
          xAxes: [
            {
              display: this.xAxesConfig[0],
              position: this.xAxesConfig[1],
              // offset: true
              ticks: {
                autoSkip: false,
                // maxRotation: 0,
                // minRotation: 0,
              },
              gridLines: {
                color: '#999',
                drawOnChartArea: true,
                // drawBorder: true
                lineWidth: 0.5,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                // autoSkip: true,
                // maxRotation: 0,
                // minRotation: 0,
                // mirror: false,
                // labelOffset: 0,
                // padding: 0,
                fontSize: 11,
                fontStyle: 'bold',
                // lineHeight: 0.5,
                callback: (value) => {
                  // value, index, values
                  return value
                },
              },
            },
          ],
        },
        tooltips: {
          displayColors: true,
          intersect: true,
          mode: 'point',
          // callbacks: {
          //   label: tooltipItems => {
          //     console.log(tooltipItems)
          //     return tooltipItems
          //   }
          // }
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
