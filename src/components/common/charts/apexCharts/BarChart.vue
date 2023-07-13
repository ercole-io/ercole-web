<template>
  <apex-chart
    type="bar"
    :height="chartHeight"
    :width="chartWidth"
    :options="chartOptions"
    :series="chartSeries"
    :id="chartID"
    class="mt-4"
  />
</template>

<script>
export default {
  name: 'apex-bar-chart',
  props: {
    chartOptions: {
      type: Object,
      default: () => {},
    },
    chartSeries: {
      type: Array,
      default: () => [],
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
  },
}
</script>

<style lang="scss" scoped></style>
