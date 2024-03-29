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
        <v-th sortKey="ignoredComment">Ignore Comment</v-th>
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
          :ignoreComment="rowData.scope.ignoredComment"
          :type="findLicenseType(rowData.scope.description)"
          page="licenses-used"
          v-if="rowData.scope.licenseTypeID"
        />
        <TdContent value="" v-else />
        <TdContent :value="rowData.scope.ignoredComment" />
        <HostLink :hostname="[rowData.scope.hostname, rowData.scope.dbName]" />
        <TdContent :value="rowData.scope.dbName" />
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

      <ExportButton
        slot="export"
        url="hosts/technologies/all/databases/licenses-used"
        expName="licensesUsedPerDbs"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { findLicenseType } from '@/helpers/licenses.js'
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
  name: 'licenses-used-databases-list-component',
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
        'ignoredComment',
      ],
    }
  },
  methods: {
    findLicenseType(desc) {
      return findLicenseType(desc)
    },
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
