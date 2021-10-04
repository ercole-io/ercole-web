<template>
  <b-tab-item label="Services" v-if="services.length > 0">
    <FullTable
      :tableData="services"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      hideTopTable
    >
      <template slot="headData">
        <v-th sortKey="name">Name</v-th>
        <v-th sortKey="creationDate">Creation Date</v-th>
        <v-th sortKey="enable">Enable</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.name" />
        <TdContent :value="rowData.scope.creationDate" />
        <TdContent :value="rowData.scope.enable" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    services: {
      type: Array,
      default: Array
    }
  },
  components: {
    FullTable,
    TdContent
  },
  data() {
    return {
      keyy: ['name', 'creationDate', 'enable']
    }
  }
}
</script>

<style lang="scss" scoped></style>
