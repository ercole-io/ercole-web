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
      class="is-danger"
    >
      <template slot="customTopHeader">
        <b-button
          :label="showSaveLabel"
          type="is-primary"
          size="is-small"
          icon-pack="fas"
          icon-left="eye"
          class="has-text-weight-semibold ml-2 mr-2"
          @click="prepareSelectedLicensesToSave"
          v-if="showSaveButton"
        />

        <div class="is-flex is-flex-direction-column mr-5">
          <b-checkbox size="is-small" v-model="isIgnoreLicenses">
            <span class="has-text-weight-semibold">
              Ignore Licenses By Group
            </span>
          </b-checkbox>
          <b-checkbox
            size="is-small"
            v-model="isReactivateLicenses"
            class="mt-1"
          >
            <span class="has-text-weight-semibold">
              Reactivate Licenses By Group
            </span>
          </b-checkbox>
        </div>
      </template>

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
        <TdContent
          isSlot
          class="has-text-centered p-0"
          v-if="showCheckboxes(rowData.scope.ignored)"
        >
          <b-checkbox
            size="is-small"
            style="min-height: 30px"
            class="ml-2"
            @input="handleSelectedLicenses(rowData.scope)"
          />
        </TdContent>
        <TdContent isSlot class="has-text-centered p-0" v-else>
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
        </TdContent>
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
import _ from 'lodash'
import { mapGetters, mapState } from 'vuex'
import { findLicenseType } from '@/helpers/licenses.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import ignoreLicensesMixin from '@/mixins/licenses/ignoreLicensesMixin.js'
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
  mixins: [paginationMixin, hostnameLinkRow, ignoreLicensesMixin],
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
      isIgnoreLicenses: false,
      isReactivateLicenses: false,
      selectedLicenses: [],
    }
  },
  methods: {
    findLicenseType(desc) {
      return findLicenseType(desc)
    },
    showCheckboxes(status) {
      return (
        (this.isIgnoreLicenses && !status) ||
        (this.isReactivateLicenses && status)
      )
    },
    handleSelectedLicenses(data) {
      const index = _.findIndex(
        this.selectedLicenses,
        (license) =>
          license.hostname === data.hostname &&
          license.dbName === data.dbName &&
          license.licenseTypeID === data.licenseTypeID
      )

      if (index > -1) {
        this.selectedLicenses.splice(index, 1)
      } else {
        this.selectedLicenses = [...this.selectedLicenses, data]
      }
    },
    prepareSelectedLicensesToSave() {
      this.selectedLicenses = _.map(this.selectedLicenses, (val) => {
        return {
          database: val.dbName,
          hostname: val.hostname,
          licenseID: val.licenseTypeID,
          status: !val.ignored,
          page: 'licenses-used',
          type: findLicenseType(val.description),
          comment: val.ignoredComment,
        }
      })

      this.handleIgnoreClick()
    },
  },
  computed: {
    ...mapState(['licensesUsed']),
    ...mapGetters(['getUsedLicensesByDbs']),
    showSaveButton() {
      return (
        (this.selectedLicenses.length > 0 && this.isIgnoreLicenses) ||
        (this.selectedLicenses.length > 0 && this.isReactivateLicenses)
      )
    },
    showSaveLabel() {
      return this.isIgnoreLicenses
        ? 'Save Ignore Licenses'
        : 'Save Reactivate Licenses'
    },
  },
  watch: {
    isIgnoreLicenses(val) {
      if (val) {
        this.isReactivateLicenses = false
        this.selectedLicenses = []
      }
    },
    isReactivateLicenses(val) {
      if (val) {
        this.isIgnoreLicenses = false
        this.selectedLicenses = []
      }
    },
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

.row-error {
  background-color: lightpink;
}
</style>
