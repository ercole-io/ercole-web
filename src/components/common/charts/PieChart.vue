<template>
  <pie-chart
    :id="chartId"
    :data="pieChartData"
    :download="{ background: '#fff' }"
    legend="bottom"
    :suffix="setSuffix"
    :messages="{ empty: 'No data' }"
  />
</template>

<script>
export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    pieChartData: {
      type: Array || Object,
      required: true
    },
    setSuffix: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
