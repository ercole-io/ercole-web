<template>
  <b-tab-item label="Features" v-if="features && features.length > 0">
    <FullTable
      :tableData="features"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="feature">Feature</v-th>
        <v-th sortKey="product">Product</v-th>
        <v-th sortKey="edition">Edition</v-th>
        <v-th sortKey="language">Language</v-th>
        <v-th sortKey="version">Version</v-th>
        <v-th sortKey="clustered">Clustered</v-th>
        <v-th sortKey="configured">Configured</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.feature" />
        <TdContent :value="rowData.scope.product" />
        <TdContent :value="rowData.scope.edition" />
        <TdContent :value="rowData.scope.language" />
        <TdContent :value="rowData.scope.version" />
        <TdIcon :value="rowData.scope.clustered" />
        <TdIcon :value="rowData.scope.configured" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  name: 'hosts-details-microsoft-databases-features-component',
  props: {
    features: {
      type: Array,
      default: null,
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
        'clustered',
        'configured',
        'edition',
        'feature',
        'language',
        'product',
        'version',
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
