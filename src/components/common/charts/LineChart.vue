<template>
  <line-chart :data="lineChartData" />
</template>

<script>
export default {
  props: {
    lineChartData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
