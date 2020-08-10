<template>
  <column-chart
    :id="chartId"
    :data="columnChartData"
    :dataset="{ borderWidth: 0 }"
    :download="{ background: '#fff' }"
    :stacked="stacked"
    :colors="colors"
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
    columnChartData: {
      type: Array || Object,
      required: true
    },
    stacked: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped></style>
