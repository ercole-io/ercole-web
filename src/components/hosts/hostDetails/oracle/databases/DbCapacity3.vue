<template>
  <b-tab-item label="Capacity 3">
    <BoxContent border title="CPU Database">
      <ColumnChart chartId="monthlyCapacity" :columnChartData="data" stacked />
    </BoxContent>
  </b-tab-item>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import ColumnChart from '@/components/common/charts/ColumnChart.vue'

export default {
  name: 'hosts-details-oracle-databases-patches-component',
  props: {
    capacity: {
      type: Array,
      default: null,
    },
  },
  components: {
    BoxContent,
    ColumnChart,
  },
  data() {
    return {
      data: [
        {
          name: 'Avg',
          data: [
            ['Month', 50],
            ['Week 1', 150],
            ['Week 2', 100],
            ['Week 3', 200],
            ['Week 4', 50],
            ['Day 1', 150],
            ['Day 2', 100],
            ['Day 3', 200],
            ['Day 4', 150],
            ['Day 5', 100],
            ['Day 6', 200],
            ['Day 7', 200],
          ],
        },
        {
          name: 'Max',
          data: [
            ['Month', 100],
            ['Week 1', 250],
            ['Week 2', 200],
            ['Week 3', 300],
            ['Week 4', 50],
            ['Day 1', 150],
            ['Day 2', 100],
            ['Day 3', 200],
            ['Day 4', 150],
            ['Day 5', 100],
            ['Day 6', 200],
            ['Day 7', 200],
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
