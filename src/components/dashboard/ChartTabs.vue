<template>
  <BoxContent>
    <b-tabs type="is-toggle" size="is-small" expanded>
      <b-tab-item label="All Infrastructures">
        <BubbleChart />
      </b-tab-item>

      <b-tab-item label="Software Types">
        <PieChart />
      </b-tab-item>

      <b-tab-item label="Changes">
        <h1>Changes</h1>
      </b-tab-item>

      <b-tab-item label="Type of Technologies">
        <h1>Type of Technologies</h1>
      </b-tab-item>
    </b-tabs>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import BubbleChart from '@/components/common/charts/BubbleChart.vue'
import PieChart from '@/components/common/charts/PieChart.vue'

export default {
  components: {
    BoxContent,
    BubbleChart,
    PieChart
  }
}
</script>

<style lang="scss" scoped></style>
