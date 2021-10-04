<template>
  <ToggleColumns
    getPage="licensesUsedClusters"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <UsedLicensesClustersFilters slot="left" />

    <FullTable
      slot="center"
      :placeholder="$t('menu.licUsed')"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByCluster"
    >
      <template slot="headData">
        <v-th sortKey="cluster">
          {{ $t('common.fields.cluster') }}
        </v-th>
        <v-th sortKey="licenseTypeID">
          {{ $t('common.fields.partNumber') }}
        </v-th>
        <v-th sortKey="itemDescription">
          {{ $t('common.collumns.description') }}
        </v-th>
        <v-th sortKey="metric">
          {{ $t('common.collumns.metric') }}
        </v-th>
        <v-th sortKey="usedLicenses">
          {{ $t('common.collumns.usedLicenses') }}
        </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.cluster" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.itemDescription" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent :value="rowData.scope.usedLicenses" />
      </template>

      <exportButton
        slot="export"
        url="hosts/technologies/all/databases/licenses-used-per-cluster"
        expName="licensesUsedPerCluster"
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
import TdContent from '@/components/common/Table/TdContent.vue'
import UsedLicensesClustersFilters from '@/components/licenses/used/clusters/UsedLicensesClustersFilters.vue'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  mixins: [
    HighlightSearchMixin,
    TooltipMixin,
    paginationMixin,
    hostnameLinkRow
  ],
  components: {
    ToggleColumns,
    FullTable,
    TdContent,
    UsedLicensesClustersFilters,
    ExportButton
  },
  props: {
    partNumber: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      keys: [
        'cluster',
        'licenseTypeID',
        'itemDescription',
        'metric',
        'usedLicenses'
      ]
    }
  },
  mounted() {
    this.getUsedLicensesByCluster
  },
  computed: {
    ...mapGetters(['getUsedLicensesByCluster'])
  }
}
</script>

<style lang="scss" scoped></style>