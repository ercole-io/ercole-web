<template>
  <b-tab-item label="Patches" v-if="patches.length > 0">
    <FullTable
      :tableData="patches"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="action">Action</v-th>
        <v-th sortKey="version">Version</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="patchID">Patch</v-th>
        <v-th sortKey="date">Date</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.action" />
        <TdContent :value="rowData.scope.version" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.patchID" />
        <TdContent :value="rowData.scope.date" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    patches: {
      type: Array,
      default: null,
    },
  },
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: ['action', 'version', 'description', 'patchID', 'date'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
