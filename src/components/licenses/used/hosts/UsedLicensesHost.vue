<template>
  <ToggleColumns
    getPage="licensesUsedHosts"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <UsedLicensesHostFilters slot="left" />

    <FullTable
      slot="center"
      :placeholder="$t('menu.licUsed')"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByHost"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="false"
    >
      <template slot="headData">
        <v-th sortKey="hostname">{{ $t('common.collumns.hostname') }}</v-th>
        <v-th sortKey="databases">{{ $t('common.collumns.databases') }}</v-th>
        <v-th sortKey="licenseTypeID">
          {{ $t('common.collumns.partNumber') }}
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
        <v-th sortKey="clusterLicenses">
          {{ $t('common.collumns.clusterLicenses') }}
        </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" />
        <td v-tooltip.bottom="options(rowData.scope.databases)">
          <a @click.prevent="openModal(rowData.scope)" class="is-block db-link">
            <span v-html="highlight(rowData.scope.databases)" />
          </a>
        </td>
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent
          :value="rowData.scope.usedLicenses"
          :class="
            rowData.scope.clusterLicenses > 0 && !rowData.scope.olvmCapped
              ? 'line-through'
              : ''
          "
        />
        <TdContent
          :value="rowData.scope.clusterLicenses"
          :class="rowData.scope.olvmCapped ? 'line-through' : ''"
        />
      </template>

      <exportButton
        slot="export"
        url="hosts/technologies/all/databases/licenses-used-per-host"
        expName="licensesUsedPerHosts"
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
import HostLink from '@/components/common/Table/HostLink.vue'
import UsedLicensesHostFilters from '@/components/licenses/used/hosts/UsedLicensesHostFilters.vue'
import UsedLicensesHostModal from '@/components/licenses/used/hosts/UsedLicensesHostModal.vue'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import ExportButton from '@/components/common/ExportButton.vue'

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
    HostLink,
    UsedLicensesHostFilters,
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
        'hostname',
        'licenseTypeID',
        'databases',
        'description',
        'metric',
        'usedLicenses',
        'clusterLicenses',
      ],
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    openModal(info) {
      this.$buefy.modal.open({
        component: UsedLicensesHostModal,
        hasModalCard: true,
        props: {
          databases: info.databasesNames,
          licenseInfo: {
            licenseId: info.licenseTypeID,
            hostname: info.hostname,
            metric: info.metric,
            description: info.description,
          },
        },
      })
    },
  },
  computed: {
    ...mapGetters(['getUsedLicensesByHost']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.db-link {
  color: $custom-primary;

  &:hover {
    color: $ercole-blue;
  }
}
</style>
