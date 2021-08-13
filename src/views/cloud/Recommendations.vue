<template>
  <FullTable
    slot="center"
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(recommendations)"
    :tableData="recommendations"
  >
    <template slot="headData">
      <v-th sortKey="name">
        Recommendation
      </v-th>
      <v-th sortKey="type">
        Cloud Infrastructure
      </v-th>
      <v-th sortKey="resourceCounts[0].count">
        Pending
      </v-th>
      <v-th sortKey="estimatedCostSaving">
        Estimated Savings
      </v-th>
      <v-th sortKey="lifecycleState">
        Status
      </v-th>
      <v-th sortKey="importance">
        Importance
      </v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.type" />
      <TdContent :value="rowData.scope.resourceCounts[0].count" />
      <TdContent :value="`€${rowData.scope.estimatedCostSaving}/month`" />
      <TdContent :value="rowData.scope.lifecycleState" />
      <TdContent :value="rowData.scope.importance" />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import recommendations from '@/views/cloud/recommendations.json'

export default {
  mixins: [getHeadKeys],
  components: {
    FullTable,
    TdContent
  },
  data() {
    return {
      recommendations: recommendations
    }
  }
}
</script>

<style lang="scss" scoped></style>
