<template>
  <pie-chart
    :id="chartId"
    :data="pieChartData"
    :download="{ background: '#fff' }"
    :suffix="setSuffix"
    :messages="{ empty: 'No data' }"
    :legend="setLegend"
  />
</template>

<script>
export default {
  name: 'commom-charts-pie-component',
  props: {
    chartId: {
      type: String,
      required: true,
    },
    pieChartData: {
      type: Array || Object,
      required: true,
    },
    setSuffix: {
      type: String,
    },
    setLegend: {
      type: [Boolean, String],
      default: 'bottom',
    },
  },
}
</script>

<style lang="scss"></style>
