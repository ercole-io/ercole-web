<template>
  <b-tab-item label="Options" v-if="options && options.length > 0">
    <FullTable
      :tableData="options"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="firstUsageDate">First</v-th>
        <v-th sortKey="lastUsageDate">Last</v-th>
        <v-th sortKey="detectedUsages">Detected</v-th>
        <v-th sortKey="product">Prod</v-th>
        <v-th sortKey="currentlyUsed">Currently</v-th>
        <v-th sortKey="extraFeatureInfo">Extra</v-th>
        <v-th sortKey="feature">Feature</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.firstUsageDate" />
        <TdContent :value="rowData.scope.lastUsageDate" />
        <TdContent :value="rowData.scope.detectedUsages" />
        <TdContent :value="rowData.scope.product" />
        <TdIcon :value="rowData.scope.currentlyUsed" />
        <TdContent :value="rowData.scope.extraFeatureInfo" />
        <TdContent :value="rowData.scope.feature" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  props: {
    options: {
      type: Array,
      default: Array,
    },
  },
  components: {
    FullTable,
    TdContent,
    TdIcon,
  },
  data() {
    return {
      keys: [
        'lastUsageDate',
        'detectedUsages',
        'product',
        'currentlyUsed',
        'extraFeatureInfo',
        'feature',
        'firstUsageDate',
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
