<template>
  <b-tab-item label="Capacity">
    <BoxContent border title="CPU Database">
      <div class="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
        <BoxContent border title="Month">
          <ColumnChart
            chartId="monthlyCapacity"
            :columnChartData="data"
            chartHeight="250"
          />
        </BoxContent>
        <BoxContent border title="Week 1">
          <ColumnChart
            chartId="firstweekCapacity"
            :columnChartData="data1"
            chartHeight="250"
          />
        </BoxContent>
        <BoxContent border title="Week 2">
          <ColumnChart
            chartId="secondweekCapacity"
            :columnChartData="data2"
            chartHeight="250"
          />
        </BoxContent>
        <BoxContent border title="Week 3">
          <ColumnChart
            chartId="thirdweekCapacity"
            :columnChartData="data3"
            chartHeight="250"
          />
        </BoxContent>
        <BoxContent border title="Week 4">
          <ColumnChart
            chartId="fourthweekCapacity"
            :columnChartData="data4"
            chartHeight="250"
          />
        </BoxContent>
      </div>
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
          data: [['', 50]],
        },
        {
          name: 'Max',
          data: [['', 100]],
        },
      ],
      data1: [
        {
          name: 'Avg',
          data: [['', 150]],
        },
        {
          name: 'Max',
          data: [['', 200]],
        },
      ],
      data2: [
        {
          name: 'Avg',
          data: [['', 250]],
        },
        {
          name: 'Max',
          data: [['', 300]],
        },
      ],
      data3: [
        {
          name: 'Avg',
          data: [['', 50]],
        },
        {
          name: 'Max',
          data: [['', 200]],
        },
      ],
      data4: [
        {
          name: 'Avg',
          data: [['', 350]],
        },
        {
          name: 'Max',
          data: [['', 400]],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
