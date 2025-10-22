<template>
  <b-tab-item label="Licenses" v-if="licenses && licenses.length > 0">
    <FullTable
      :tableData="getLicenses"
      :keys="keys"
      hideSearch
      hidePerpage
      hidePagination
      :isLoadingTable="false"
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
        <v-th sortKey="ignored">Ignore License</v-th>
        <v-th sortKey="ignoredComment">Ignore Comment</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="description">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
        <v-th sortKey="usedLicenses">Used Licenses</v-th>
        <v-th sortKey="clusterLicenses">Cluster Licenses</v-th>
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
          <IgnoreDbLicense
            :db="rowData.scope.dbName"
            :host="$route.params.hostname"
            :licenseID="rowData.scope.licenseTypeID"
            :description="rowData.scope.description"
            :metric="rowData.scope.metric"
            :status="!rowData.scope.ignored"
            :ignoreComment="rowData.scope.ignoredComment"
            type="mysql"
            page="host-details"
          />
        </TdContent>
        <TdContent :value="rowData.scope.ignoredComment" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.description" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent
          :value="rowData.scope.usedLicenses"
          :class="rowData.scope.clusterLicenses > 0 ? 'line-through' : ''"
        />
        <TdContent :value="rowData.scope.clusterLicenses" />
      </template>
    </FullTable>
  </b-tab-item>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import ignoreLicensesMixin from '@/mixins/licenses/ignoreLicensesMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import IgnoreDbLicense from '@/components/licenses/used/databases/ignoreDbLicense.vue'

export default {
  name: 'hosts-details-mysql-databases-licenses-component',
  mixins: [ignoreLicensesMixin],
  props: {
    licenses: {
      type: Array,
      default: null,
    },
  },
  components: {
    FullTable,
    TdContent,
    IgnoreDbLicense,
  },
  data() {
    return {
      keys: [
        'ignored',
        'licenseTypeID',
        'description',
        'metric',
        'usedLicenses',
        'clusterLicenses',
        'ignoredComment',
      ],
      getLicenses: [],
    }
  },
  beforeMount() {
    this.getLicenses = _.cloneDeep(this.licenses)

    bus.$on('host-details-ignore-license', (data) => {
      this.hostDetailsIgnoreLicense(data)
    })

    bus.$on('host-details-ignore-license-by-group', (data) => {
      this.hostDetailsIgnoreLicenseByGroup(data)
    })
  },
}
</script>

<style lang="scss" scoped></style>
