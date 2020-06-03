<template>
  <line-chart
    :id="chartId"
    :data="lineChartData"
    :dataset="{ borderWidth: 0 }"
    :download="{ background: '#fff' }"
    legend="bottom"
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
