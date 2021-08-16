<template>
  <FullTable
    slot="center"
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(getRecommendations)"
    :tableData="getRecommendations"
  >
    <template slot="headData">
      <v-th sortKey="name">
        Recommendation
      </v-th>
      <v-th sortKey="type">
        Cloud Infrastructure
      </v-th>
      <v-th sortKey="pending">
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
      <TdContent :value="rowData.scope.pending" />
      <TdContent :value="`€${rowData.scope.estimatedCostSaving}/month`" />
      <TdContent :value="rowData.scope.lifecycleState" />
      <TdContent :value="rowData.scope.importance" />
    </template>

    <ExportButton slot="export" url="" expName="cloudRecommendations" />
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  mixins: [getHeadKeys],
  components: {
    FullTable,
    TdContent,
    ExportButton
  },
  computed: {
    ...mapGetters(['getRecommendations'])
  }
}
</script>

<style lang="scss" scoped></style>
