<template>
  <column-chart
    :id="chartId"
    :data="columnChartData"
    :dataset="{ borderWidth: 0 }"
    :download="{ background: '#fff' }"
    :stacked="stacked"
    :colors="colors"
    :legend="legend"
    :messages="{ empty: 'No data' }"
    :style="{ height: chartHeight, width: '250px' }"
    :bytes="true"
  />
</template>

<script>
export default {
  name: 'commom-charts-column-component',
  props: {
    chartId: {
      type: String,
      required: true,
    },
    columnChartData: {
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
  },
}
</script>

<style lang="scss" scoped></style>
