<template>
  <b-tab-item label="Patches" v-if="patches && patches.length > 0">
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
        <v-th sortKey="displayName">Name</v-th>
        <v-th sortKey="displayVersion">Version</v-th>
        <v-th sortKey="installDate">Install Date</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.displayName" />
        <TdContent :value="rowData.scope.displayVersion" />
        <TdContent :value="rowData.scope.installDate | formatDate" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'hosts-details-microsoft-databases-patches-component',
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
      keys: ['displayName', 'displayVersion', 'installDate'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
