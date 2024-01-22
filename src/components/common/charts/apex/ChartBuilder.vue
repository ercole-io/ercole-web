<template>
  <apex-chart
    :type="chartType"
    :options="chartOptions"
    :series="chartSeries"
    :id="chartID"
    :height="chartHeight"
    :width="chartWidth"
    :class="chartClass"
  />
</template>

<script>
export default {
  name: 'apex-chart-builder',
  props: {
    chartType: {
      type: String,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
    chartSeries: {
      type: Array,
      required: true,
    },
    chartID: {
      type: String,
      required: true,
    },
    chartHeight: {
      type: String,
      default: '400',
    },
    chartWidth: {
      type: String,
      default: '100%',
    },
    chartClass: {
      type: String,
      default: 'mt-4',
    },
  },
}
</script>

<style lang="scss" scoped></style>
