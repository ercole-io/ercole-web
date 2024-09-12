<template>
  <b-tab-item label="Pluggable DBs">
    <RangeDates :setRange="SET_RANGE_DATES_ALT" class="mt-0 mr-0" />

    <CollapseSimple
      v-for="(pdb, i) in pdbs"
      :key="i"
      :id="i"
      :isOpen="false"
      :collapseID="pdb.pdbName"
      :collapseTitle="pdb.pdbName"
      @click.native="callPdbExtraInfo(pdb.pdbName)"
    >
      <b-tabs
        size="is-small"
        position="is-centered"
        class="pdbs-tabs block mr-0 p-3"
        destroy-on-hide
      >
        <b-tab-item label="General" class="mt-5">
          <p class="mb-0 mt-2 is-size-7">
            Status:
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbStatus)"
            />
          </p>
          <p class="mb-0 is-size-7">
            Allocable:
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbAllocable)"
            />
          </p>
          <p class="mb-0 is-size-7">
            DatafileSize:
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbDatafileSize)"
            />
          </p>
          <p class="mb-0 is-size-7">
            SegmentsSize:
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbSegmentsSize)"
            />
          </p>
          <p class="mb-0 is-size-7">
            Charset:
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbCharset)"
            />
          </p>
          <p class="mb-0 is-size-7">
            Pga Target (GB):
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbPgaTarget)"
            />
          </p>
          <p class="mb-0 is-size-7">
            Sga Target (GB):
            <span
              class="has-text-weight-medium"
              v-html="highlight(pdb.pdbSgaTarget)"
            />
          </p>
        </b-tab-item>
        <b-tab-item
          label="Schemas"
          class="mt-5"
          v-if="pdb.pdbSchemas && pdb.pdbSchemas.length > 0"
        >
          <FullTable
            :tableData="pdb.pdbSchemas"
            :keys="['user', 'total', 'tables', 'indexes', 'lob']"
            hideSearch
            hidePerpage
            hidePagination
            hideTopTable
            :isLoadingTable="false"
            style="overflow: hidden"
          >
            <template slot="headData">
              <v-th sortKey="user">User</v-th>
              <v-th sortKey="total">Total</v-th>
              <v-th sortKey="tables">Tables</v-th>
              <v-th sortKey="indexes">Indexes</v-th>
              <v-th sortKey="lob">LOB</v-th>
              <v-th sortKey="accountStatus">Account Status</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.user" />
              <TdContent :value="rowData.scope.total" />
              <TdContent :value="rowData.scope.tables" />
              <TdContent :value="rowData.scope.indexes" />
              <TdContent :value="rowData.scope.lob" />
              <TdContent :value="rowData.scope.accountStatus" />
            </template>
          </FullTable>
        </b-tab-item>
        <b-tab-item
          label="Tablespaces"
          class="mt-5"
          v-if="pdb.pdbTablespaces && pdb.pdbTablespaces.length > 0"
        >
          <FullTable
            :tableData="pdb.pdbTablespaces"
            :keys="['name', 'status', 'usedPerc', 'used', 'total', 'maxSize']"
            hideSearch
            hidePerpage
            hidePagination
            hideTopTable
            :isLoadingTable="false"
          >
            <template slot="headData">
              <v-th sortKey="name">Name</v-th>
              <v-th sortKey="status">Status</v-th>
              <v-th sortKey="usedPerc">Used MB</v-th>
              <v-th sortKey="used">Used %</v-th>
              <v-th sortKey="total">Total MB</v-th>
              <v-th sortKey="maxSize">Max Size MB</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.name" />
              <TdContent :value="rowData.scope.status" />
              <TdContent :value="rowData.scope.usedPerc" />
              <TdContent :value="rowData.scope.used" />
              <TdContent :value="rowData.scope.total" />
              <TdContent :value="rowData.scope.maxSize" />
            </template>
          </FullTable>
        </b-tab-item>
        <b-tab-item
          label="Grant Role"
          class="mt-5"
          v-if="pdb.pdbGrantDba && pdb.pdbGrantDba.length > 0"
        >
          <FullTable
            :tableData="pdb.pdbGrantDba"
            :keys="['adminOption', 'defaultRole', 'grantee']"
            hideSearch
            hidePerpage
            hidePagination
            hideTopTable
            :isLoadingTable="false"
          >
            <template slot="headData">
              <v-th sortKey="grantee">Grantee</v-th>
              <v-th sortKey="adminOption">Admin Option</v-th>
              <v-th sortKey="defaultRole">Default Role</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.grantee" />
              <TdIcon :value="rowData.scope.adminOption" />
              <TdIcon :value="rowData.scope.defaultRole" />
            </template>
          </FullTable>
        </b-tab-item>
        <b-tab-item
          label="Segment Advisors"
          class="mt-5"
          v-if="pdb.segmentAdvisors && pdb.segmentAdvisors.length > 0"
        >
          <FullTable
            :tableData="pdb.segmentAdvisors"
            :keys="[
              'segmentOwner',
              'segmentName',
              'segmentType',
              'partitionName',
              'recommendation',
            ]"
            hideSearch
            hidePerpage
            hidePagination
            hideTopTable
            :isLoadingTable="false"
          >
            <template slot="headData">
              <v-th sortKey="segmentOwner">Segment Owner</v-th>
              <v-th sortKey="segmentName">Segment Name</v-th>
              <v-th sortKey="segmentType">Segment Type</v-th>
              <v-th sortKey="partitionName">Partition Name</v-th>
              <v-th sortKey="recommendation">Recommendation</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.segmentOwner" />
              <TdContent :value="rowData.scope.segmentName" />
              <TdContent :value="rowData.scope.segmentType" />
              <TdContent :value="rowData.scope.partitionName" />
              <TdContent :value="rowData.scope.recommendation" />
            </template>
          </FullTable>
        </b-tab-item>
        <b-tab-item
          label="Partitioning"
          class="mt-5"
          v-if="pdb.partitionings && pdb.partitionings.length > 0"
        >
          <FullTable
            :tableData="pdb.partitionings"
            :keys="[
              'date',
              'mb',
              'owner',
              'partitionName',
              'segmentName',
              'segmentType',
            ]"
            hideSearch
            hidePerpage
            hidePagination
            hideTopTable
            :isLoadingTable="false"
          >
            <template slot="headData">
              <v-th sortKey="segmentName">Segment Name</v-th>
              <v-th sortKey="owner">Segment Owner</v-th>
              <v-th sortKey="segmentType">Segment Type</v-th>
              <v-th sortKey="partitionName">Partition</v-th>
              <v-th sortKey="mb" defaultSort="desc">MB</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.segmentName" />
              <TdContent :value="rowData.scope.owner" />
              <TdContent :value="rowData.scope.segmentType" />
              <TdContent :value="rowData.scope.partitionName" />
              <TdContent :value="rowData.scope.mb" />
            </template>
          </FullTable>
        </b-tab-item>
        <b-tab-item label="DB Growth">
          <DbGrowth
            :data="getOraclePdbsDbGrowth(dbname, pdb.pdbName)"
            :dataID="`dbGrowth-${pdb.pdbName}`"
            class="mt-3"
          />
        </b-tab-item>
        <CapacityTab
          :capacity="pdb.pdbCapacity"
          :capacityDaily="pdb.pdbDailyCapacity"
        />
        <b-tab-item
          label="Services"
          class="mt-5"
          v-if="pdb.pdbServices && pdb.pdbServices.length > 0"
        >
          <FullTable
            :tableData="pdb.pdbServices"
            :keys="['name', 'enabled']"
            hideSearch
            hidePerpage
            hidePagination
            hideTopTable
            :isLoadingTable="false"
          >
            <template slot="headData">
              <v-th sortKey="name">Service Name</v-th>
              <v-th sortKey="enabled">Enabled</v-th>
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <TdContent :value="rowData.scope.name" />
              <TdIcon :value="rowData.scope.enabled" />
            </template>
          </FullTable>
        </b-tab-item>
        <b-tab-item
          label="Migrable to Postgre"
          :value="`migrable-to-postgre-${pdbSemaphoreColor}`"
          v-if="pdb.pdbPgsqlMigrability && pdb.pdbPgsqlMigrability.length > 0"
        >
          <br />
          <b-tabs size="is-small" type="is-boxed" destroy-on-hide>
            <b-tab-item label="General">
              <SimpleTable :theadData="['Metric', 'Count']">
                <template
                  slot="tbodyContent"
                  v-if="
                    metrics(pdb.pdbPgsqlMigrability) &&
                    metrics(pdb.pdbPgsqlMigrability).length > 0
                  "
                >
                  <tr
                    v-for="(v, i) in metrics(pdb.pdbPgsqlMigrability)"
                    :key="i"
                  >
                    <TdContent :value="v.metric" />
                    <TdContent :value="v.Count" />
                  </tr>
                </template>
                <template slot="tbodyContent" v-else>
                  <tr>
                    <td colspan="2"><NoContent style="min-height: 100px" /></td>
                  </tr>
                </template>
              </SimpleTable>
            </b-tab-item>

            <template
              v-if="Object.entries(other(pdb.pdbPgsqlMigrability)).length > 0"
            >
              <b-tab-item
                v-for="(data, i) in Object.entries(
                  other(pdb.pdbPgsqlMigrability)
                )"
                :label="data[0]"
                :key="i"
              >
                <SimpleTable :theadData="['Object Type', 'Count']">
                  <template slot="tbodyContent">
                    <tr v-for="(val, index) in data[1]" :key="index">
                      <TdContent :value="val.objectType" />
                      <TdContent :value="val.Count" />
                    </tr>
                  </template>
                </SimpleTable>
              </b-tab-item>
            </template>
          </b-tabs>
        </b-tab-item>
        <b-tab-item
          label="Policy Audit"
          :value="`policy-audit-${pdbPolicyAuditColor}`"
          v-if="pdbPolicyAuditData && pdbPolicyAuditData.length > 0"
        >
          <br />
          <SimpleTable :theadData="['Params']">
            <template slot="tbodyContent">
              <tr v-for="(p, i) in pdbPolicyAuditData" :key="i">
                <TdContent :value="p" />
              </tr>
            </template>
          </SimpleTable>
        </b-tab-item>
      </b-tabs>
    </CollapseSimple>
  </b-tab-item>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import RangeDates from '@/components/common/RangeDates.vue'
import CollapseSimple from '@/components/common/CollapseSimple.vue'
import DbGrowth from '@/components/common/DbGrowth.vue'
import CapacityTab from '@/components/hosts/hostDetails/oracle/databases/dbPDBs/CapacityTab.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'

export default {
  name: 'hosts-details-oracle-databases-pdbs-component',
  mixins: [HighlightSearchMixin, TooltipMixin],
  components: {
    FullTable,
    TdContent,
    TdIcon,
    RangeDates,
    CollapseSimple,
    DbGrowth,
    CapacityTab,
    SimpleTable,
  },
  props: {
    pdbs: {
      type: Array,
      default: null,
    },
    dbname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pdbName: '',
      pdbSemaphoreColor: '',
      pdbPolicyAuditColor: '',
      pdbPolicyAuditData: [],
    }
  },
  methods: {
    ...mapActions(['getPdbsMigrablePostgreSemaphore', 'getPdbsPolicyAudit']),
    ...mapMutations(['SET_RANGE_DATES_ALT']),
    metrics(values) {
      return _.take(values, 10)
    },
    other(values) {
      const other = _.drop(values, 10)
      return _.groupBy(other, 'schema')
    },
    async callPdbExtraInfo(pdbName) {
      const data = {
        hostname: this.$route.params.hostname,
        dbname: this.dbname,
        pdbname: pdbName,
      }
      await this.getPdbsMigrablePostgreSemaphore(data).then((res) => {
        this.pdbSemaphoreColor = res.data
      })
      await this.getPdbsPolicyAudit(data).then((res) => {
        if (_.has(res.data, 'GREEN')) {
          this.pdbPolicyAuditColor = 'green'
          this.pdbPolicyAuditData = res.data.GREEN
        } else if (_.has(res.data, 'RED')) {
          this.pdbPolicyAuditColor = 'red'
          this.pdbPolicyAuditData = res.data.RED
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getOraclePdbsDbGrowth']),
  },
}
</script>

<style lang="scss">
.pdbs-tabs {
  ul {
    li {
      margin: 0 2px;

      a {
        border-radius: 5px 5px 0 0;
      }

      [id='migrable-to-postgre-green-label'],
      [id='policy-audit-green-label'] {
        background-color: #2bad84;
        color: white !important;
      }
      [id='migrable-to-postgre-yellow-label'],
      [id='policy-audit-yellow-label'] {
        background-color: #ffe08a;
      }
      [id='migrable-to-postgre-red-label'],
      [id='policy-audit-red-label'] {
        background-color: #f14668;
        color: white !important;
      }
    }
  }
}
</style>
