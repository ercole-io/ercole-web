<template>
  <line-chart
    :id="chartId"
    :data="lineChartData"
    :dataset="{ borderWidth: 0 }"
    :download="{ background: '#fff' }"
    legend="bottom"
    :discrete="discrete"
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
