<template>
  <BaseLayoutColumns>
    <UsedLicensesDbsFilters slot="col1" />

    <FullTable
      slot="col2"
      placeholder="Licenses"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByDbs"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="licenseTypeID">{{
          $t('common.collumns.partNumber')
        }}</v-th>
        <v-th sortKey="description">{{
          $t('common.collumns.description')
        }}</v-th>
        <v-th sortKey="metric">{{ $t('common.collumns.metric') }}</v-th>
        <v-th sortKey="usedLicenses">{{
          $t('common.collumns.usedLicenses')
        }}</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbName]" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent :value="rowData.scope.usedLicenses" />
      </template>

      <!-- <exportButton
      slot="export"
      url="hosts/technologies/oracle/databases/consumed-licenses"
      expName="licenses-list-data"
    /> -->
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
// import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import UsedLicensesDbsFilters from '@/components/licenses/used/databases/UsedLicensesDbsFilters.vue'

export default {
  mixins: [paginationMixin, hostnameLinkRow],
  props: {
    partNumber: {
      type: String,
      required: false
    }
  },
  components: {
    BaseLayoutColumns,
    FullTable,
    // exportButton,
    TdContent,
    HostLink,
    UsedLicensesDbsFilters
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbName',
        'licenseTypeID',
        'usedLicenses',
        'description',
        'metric'
      ]
    }
  },
  computed: {
    ...mapGetters(['getUsedLicensesByDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
