<template>
  <b-tab-item label="Licenses" v-if="licenses.length > 0">
    <FullTable
      :tableData="licenses"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
    >
      <template slot="headData">
        <v-th sortKey="name">Name</v-th>
        <v-th sortKey="count">Number</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.count" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    licenses: {
      type: Array,
      default: null
    }
  },
  components: {
    FullTable,
    TdContent
  },
  data() {
    return {
      keys: ['name', 'count', 'licenseTypeID', 'description', 'metric']
    }
  }
}
</script>

<style lang="scss" scoped></style>
