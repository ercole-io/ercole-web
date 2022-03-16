<template>
  <FullTable
    :keys="keys"
    :tableData="data"
    :clickedRow="() => []"
    hideSearch
    hidePerpage
    hidePagination
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th style="width: 30%; visibility: hidden"></th>
      <th style="width: 20%; visibility: hidden"></th>
      <th style="width: 10%; visibility: hidden"></th>
      <th style="width: 10%; visibility: hidden"></th>
      <th style="width: 25%; visibility: hidden"></th>
      <th style="width: 25%; visibility: hidden"></th>
    </template>

    <template slot="subCustomHeadData">
      <th colspan="6" class="subHeader">Storage</th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.hostname" />
      <TdContent :value="rowData.scope.model" />
      <TdContent :value="rowData.scope.totalCPUCount" />
      <TdContent :value="rowData.scope.memory" />
      <TdContent :value="rowData.scope.swVersion" />
      <TdContent
        :value="`${rowData.scope.totalPowerSupply || '-'}     ${
          rowData.scope.tempActual || '-'
        }`"
      />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {
      keys: [],
    }
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.subHeader {
  border: none;
  background-color: antiquewhite;
  padding: 0.2em 0.75em;
  font-size: 12px;
}
</style>
