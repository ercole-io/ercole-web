<template>
  <ToggleColumns
    getPage="licensesUsedClusters"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <UsedLicensesClustersFilters
      slot="left"
      :loadingStatus="licensesUsed.clustersLoading"
    />

    <FullTable
      slot="center"
      :placeholder="$t('menu.licUsed')"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByCluster"
      :isLoadingTable="licensesUsed.clustersLoading"
    >
      <template slot="headData">
        <v-th sortKey="cluster">
          {{ $t('common.fields.cluster') }}
        </v-th>
        <v-th sortKey="hostCount"> Hosts </v-th>
        <v-th sortKey="licenseTypeID">
          {{ $t('common.fields.partNumber') }}
        </v-th>
        <v-th sortKey="description">
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
        <!-- <TdContent :value="rowData.scope.hostCount" /> -->
        <td v-tooltip.bottom="options(rowData.scope.hostCount)">
          <a @click.prevent="openModal(rowData.scope)" class="is-block">
            <span v-html="highlight(rowData.scope.hostCount)" />
          </a>
        </td>
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
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
import { mapGetters, mapState } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import UsedLicensesClustersFilters from '@/components/licenses/used/clusters/UsedLicensesClustersFilters.vue'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import ExportButton from '@/components/common/ExportButton.vue'
import UsedLicensesClustersModal from '@/components/licenses/used/clusters/UsedLicensesClustersModal.vue'

export default {
  mixins: [
    HighlightSearchMixin,
    TooltipMixin,
    paginationMixin,
    hostnameLinkRow,
  ],
  components: {
    ToggleColumns,
    FullTable,
    TdContent,
    UsedLicensesClustersFilters,
    ExportButton,
  },
  props: {
    partNumber: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      keys: [
        'cluster',
        'licenseTypeID',
        'description',
        'metric',
        'usedLicenses',
        'hostCount',
      ],
    }
  },
  methods: {
    openModal(info) {
      this.$buefy.modal.open({
        component: UsedLicensesClustersModal,
        hasModalCard: true,
        props: {
          hosts: info.hostnames,
          licenseInfo: {
            cluster: info.cluster,
            fullPartNumber: info.fullPartNumber,
          },
        },
      })
    },
  },
  computed: {
    ...mapState(['licensesUsed']),
    ...mapGetters(['getUsedLicensesByCluster']),
  },
}
</script>

<style lang="scss" scoped></style>
