<template>
  <bar-chart
    :id="chartId"
    :data="barChartData"
    :dataset="{ borderWidth: 0 }"
    :download="{ background: '#fff' }"
    :stacked="stacked"
    legend="bottom"
  ></bar-chart>
</template>

<script>
export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    barChartData: {
      type: Array || Object,
      required: true
    },
    stacked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
