<template>
  <BaseLayoutColumns v-if="isMounted">
    <PatchAdvisorFilters slot="col1" />
    <FullTable
      slot="col2"
      :placeholder="$t('menu.patAdvisor')"
      :keys="keys"
      :tableData="getOraclePatchAdvisor"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbname">{{ $t('common.collumns.databases') }}</v-th>
        <v-th sortKey="dbver">{{ $t('common.collumns.version') }}</v-th>
        <v-th sortKey="date">{{ $t('common.collumns.releaseDate') }}</v-th>
        <v-th sortKey="description">{{ $t('common.collumns.psu') }}</v-th>
        <v-th sortKey="fourMonthsText">{{
          $t('common.collumns.months', ['4'])
        }}</v-th>
        <v-th sortKey="sixMonthsText">{{
          $t('common.collumns.months', ['6'])
        }}</v-th>
        <v-th sortKey="twelveMonthsText">{{
          $t('common.collumns.months', ['12'])
        }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbname]" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.dbver" />
        <TdContent :value="rowData.scope.date" />
        <TdContent :value="rowData.scope.description" />
        <TdIcon :value="rowData.scope.fourMonths" />
        <TdIcon :value="rowData.scope.sixMonths" />
        <TdIcon :value="rowData.scope.twelveMonths" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/oracle/databases/patch-advisors"
        expName="oraclePatchAdvisor"
      />
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import PatchAdvisorFilters from '@/components/databases/oracle/patchAdvisor/PatchAdvisorFilters.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    BaseLayoutColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
    PatchAdvisorFilters
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbname',
        'dbver',
        'date',
        'description',
        'fourMonthsText',
        'sixMonthsText',
        'twelveMonthsText'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getPatchAdvisor().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getPatchAdvisor'])
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
