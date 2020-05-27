<template>
  <BoxContent>
    <b-tabs type="is-toggle" size="is-small" expanded>
      <b-tab-item label="All Infrastructures">
        <div class="columns">
          <div class="column is-3">
            <p>How your infrastructures is made</p>
            <p>
              Here you can see all the different technologies in an aggregate
              way
            </p>
          </div>
          <div class="column is-6">
            <BubbleChart chartId="chartInfra" :dataset="dataset2" />
          </div>
          <div class="column is-3">3</div>
        </div>
      </b-tab-item>

      <b-tab-item label="Software Types">
        <PieChart />
      </b-tab-item>

      <b-tab-item label="Changes">
        <BubbleChart chartId="chartChanges" :dataset="dataset1" />
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
  },
  data() {
    return {
      dataset1: {
        children: [
          { Name: 'Apple Pie', Count: 1487 },
          { Name: 'Orange Juice', Count: 1423 },
          { Name: 'American Cheese', Count: 1372 },
          { Name: 'Green Peas', Count: 1341 },
          { Name: 'Assorted Cakes', Count: 1331 },
          { Name: 'French Fried Potatoes', Count: 1328 },
          { Name: 'Potato Salad', Count: 1306 },
          { Name: 'Baked Potatoes', Count: 1293 },
          { Name: 'Roquefort', Count: 1273 },
          { Name: 'Stewed Prunes', Count: 1268 }
        ]
      },
      dataset2: {
        children: [
          { Name: 'Olives', Count: 4319 },
          { Name: 'Tea', Count: 4159 },
          { Name: 'Mashed Potatoes', Count: 2583 },
          { Name: 'Boiled Potatoes', Count: 2074 },
          { Name: 'Milk', Count: 1894 },
          { Name: 'Chicken Salad', Count: 1809 },
          { Name: 'Vanilla Ice Cream', Count: 1713 },
          { Name: 'Cocoa', Count: 1636 },
          { Name: 'Lettuce Salad', Count: 1566 },
          { Name: 'Lobster Salad', Count: 1511 },
          { Name: 'Chocolate', Count: 1489 }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
