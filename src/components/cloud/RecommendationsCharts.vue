<template>
  <div>
    <BoxContent title="Category" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <PieChart
          chartId="category"
          :pieChartData="returnCategoryChartData"
          setLegend="left"
        />
      </GhostLoading>
    </BoxContent>

    <BoxContent title="Object Type" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <PieChart
          chartId="objectType"
          :pieChartData="returnObjectTypeChartData"
          setLegend="left"
        />
      </GhostLoading>
    </BoxContent>

    <BoxContent title="Suggestion" border>
      <GhostLoading :isLoading="loadingTableStatus" setHeight="300">
        <PieChart
          chartId="suggestion"
          :pieChartData="returnSuggestionChartData"
          setLegend="left"
        />
      </GhostLoading>
    </BoxContent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import PieChart from '@/components/common/charts/PieChart.vue'

export default {
  name: 'cloud-sdvisors-recommendations-charts',
  components: {
    BoxContent,
    GhostLoading,
    PieChart,
  },
  computed: {
    ...mapGetters([
      'returnCategoryChartData',
      'returnObjectTypeChartData',
      'returnSuggestionChartData',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
