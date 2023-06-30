<template>
  <apex-chart
    type="bar"
    height="400"
    width="100%"
    :options="options"
    :series="series"
    :id="chartID"
    class="mt-4"
  />
</template>

<script>
export default {
  name: 'hosts-details-oracle-databases-capacity',
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    series: {
      type: Array,
      default: () => [],
    },
    chartID: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
