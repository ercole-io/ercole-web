<template>
  <line-chart
    :id="chartId"
    :data="lineChartData"
    :dataset="{ borderWidth: 0 }"
    :download="{ background: '#fff' }"
    :legend="hasLegend"
    :discrete="discrete"
    :messages="{ empty: 'No data' }"
    :curve="false"
  />
</template>

<script>
export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    lineChartData: {
      type: Array,
      required: true
    },
    discrete: {
      type: Boolean,
      default: false
    },
    hasLegend: {
      type: [String, Boolean],
      default: 'bottom'
    }
  }
}
</script>

<style lang="scss" scoped></style>
