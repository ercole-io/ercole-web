<template>
  <BaseLayoutColumns v-if="isMounted">
    <AddmFilters slot="col1" />
    <FullTable
      slot="col2"
      :placeholder="$t('menu.addm')"
      :keys="keys"
      :tableData="getOracleAddms"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="benefit">{{ $t('common.collumns.perfImpact') }}</v-th>
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbname">{{ $t('common.collumns.databases') }}</v-th>
        <v-th sortKey="finding">{{ $t('common.collumns.finding') }}</v-th>
        <v-th sortKey="recommendation">{{
          $t('common.collumns.recommendation')
        }}</v-th>
        <v-th sortKey="action">{{ $t('common.collumns.action') }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.benefit" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbname]" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.finding" />
        <TdContent :value="rowData.scope.recommendation" />
        <TdContent :value="rowData.scope.action" />
      </template>

      <exportButton
        slot="export"
        url="hosts/technologies/oracle/databases/addms"
        expName="oracleADDM"
      />
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import AddmFilters from '@/components/databases/oracle/addm/AddmFilters.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    BaseLayoutColumns,
    FullTable,
    exportButton,
    TdContent,
    HostLink,
    AddmFilters
  },
  data() {
    return {
      keys: [
        'benefit',
        'hostname',
        'dbname',
        'finding',
        'recommendation',
        'action'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getAddms().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getAddms'])
  },
  computed: {
    ...mapGetters(['getOracleAddms'])
  }
}
</script>

<style lang="scss" scoped></style>
