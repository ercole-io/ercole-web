<template>
  <ToggleColumns
    getPage="licensesUsedDbs"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <UsedLicensesDbsFilters slot="left">
      <Loading :isLoading="licensesUsed.databasesLoading" />
    </UsedLicensesDbsFilters>

    <FullTable
      slot="center"
      :placeholder="$t('menu.licUsed')"
      :urlSearchParam="partNumber"
      :keys="keys"
      :tableData="getUsedLicensesByDbs"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="licensesUsed.databasesLoading"
    >
      <template slot="headData">
        <v-th sortKey="ignored" class="has-text-centered">Ignore License</v-th>
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
        <ignoreDbLicense
          :db="rowData.scope.dbName"
          :host="rowData.scope.hostname"
          :licenseID="rowData.scope.licenseTypeID"
          :description="rowData.scope.description"
          :metric="rowData.scope.metric"
          :status="!rowData.scope.ignored"
          page="licenses-used"
        />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbName]" />
        <TdContent :value="rowData.scope.dbName" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent
          :value="rowData.scope.usedLicenses"
          :class="rowData.scope.clusterLicenses > 0 ? 'line-through' : ''"
        />
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
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import UsedLicensesDbsFilters from '@/components/licenses/used/databases/UsedLicensesDbsFilters.vue'
import ignoreDbLicense from '@/components/licenses/used/databases/ignoreDbLicense.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  mixins: [paginationMixin, hostnameLinkRow],
  props: {
    partNumber: {
      type: String,
      required: false,
    },
  },
  components: {
    ToggleColumns,
    FullTable,
    ExportButton,
    TdContent,
    HostLink,
    UsedLicensesDbsFilters,
    ignoreDbLicense,
    Loading,
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
        'clusterLicenses',
        'ignored',
      ],
    }
  },
  async beforeMount() {
    await this.getLicensesDatabases().then(() => {
      bus.$emit('data', this.getUsedLicensesByDbs)
    })
  },
  methods: {
    ...mapActions(['getLicensesDatabases']),
  },
  computed: {
    ...mapState(['licensesUsed']),
    ...mapGetters(['getUsedLicensesByDbs']),
  },
}
</script>

<style lang="scss" scoped>
.bt-ignore {
  &:focus {
    box-shadow: none;
  }
  &:hover {
    text-decoration: none;
  }
}
</style>
