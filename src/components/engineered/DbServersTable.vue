<template>
  <FullTable
    :keys="keys"
    :tableData="data"
    :clickedRow="() => []"
    hideSearch
    hidePerpage
    hidePagination
  >
    <template slot="headData">
      <th style="width: 30%">{{ $t('common.collumns.hostname') }}</th>
      <th style="width: 20%">{{ $t('common.collumns.model') }}</th>
      <th style="width: 10%">{{ $t('common.collumns.cpu') }}</th>
      <th style="width: 10%">{{ $t('common.collumns.memory') }}</th>
      <th style="width: 25%">{{ $t('common.collumns.version') }}</th>
      <th style="width: 25%">{{ $t('common.collumns.powerTemp') }}</th>
    </template>

    <template slot="subCustomHeadData">
      <th colspan="6" class="subHeader">DB Servers</th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.hostname" />
      <TdContent :value="rowData.scope.model" />
      <TdContent :value="rowData.scope.totalCPUCount" />
      <TdContent :value="rowData.scope.memory" />
      <TdContent :value="rowData.scope.swVersion" />
      <TdContent
        :value="
          `${rowData.scope.totalPowerSupply || '-'}     ${rowData.scope
            .tempActual || '-'}`
        "
      />
    </template>
  </FullTable>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keys: []
    }
  },
  components: {
    FullTable,
    TdContent
  }
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
