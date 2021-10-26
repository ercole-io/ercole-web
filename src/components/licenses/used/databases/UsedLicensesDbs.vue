<template>
  <ToggleColumns
    getPage="licensesUsedDbs"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <UsedLicensesDbsFilters slot="left" />
    <FullTable
      slot="center"
      :placeholder="$t('menu.licUsed')"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByDbs"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="dbName">{{ $t('common.collumns.name') }}</v-th>
        <v-th sortKey="licenseTypeID">
          {{ $t('common.collumns.partNumber') }}
        </v-th>
        <v-th sortKey="description">
          {{ $t('common.collumns.description') }}
        </v-th>
        <v-th sortKey="metric">{{ $t('common.collumns.metric') }}</v-th>
        <v-th sortKey="usedLicenses">
          {{ $t('common.collumns.usedLicenses') }}
        </v-th>
        <v-th sortKey="clusterLicenses">
          {{ $t('common.collumns.clusterLicenses') }}
        </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbName]" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent :value="rowData.scope.usedLicenses" />
        <TdContent :value="rowData.scope.clusterLicenses" />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/all/databases/licenses-used"
        expName="licensesUsedPerDbs"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
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
    ToggleColumns,
    FullTable,
    ExportButton,
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
        'metric',
        'clusterLicenses'
      ]
    }
  },
  computed: {
    ...mapGetters(['getUsedLicensesByDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
