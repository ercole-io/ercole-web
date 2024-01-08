<template>
  <div class="modal-card" v-if="isMounted">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-weight-semibold">
        {{ pdbName }} -
        <span class="is-size-5 has-text-weight-normal">{{ hostname }}</span>
      </p>
    </header>
    <section class="modal-card-body">
      <SimpleTable
        :theadData="['Status', 'Allocable', 'DatafileSize', 'SegmentsSize']"
      >
        <template slot="tbodyContent">
          <tr>
            <TdContent :value="data.status" />
            <TdContent :value="data.allocable" />
            <TdContent :value="data.datafileSize" />
            <TdContent :value="data.datafileSize" />
          </tr>
        </template>
      </SimpleTable>

      <b-tabs v-model="activeTab" size="is-small" type="is-toggle" vertical>
        <b-tab-item label="Schemas">
          <FullTable
            :tableData="data.schemas"
            :keys="[
              'user',
              'total',
              'tables',
              'indexes',
              'lob',
              'accountStatus',
            ]"
            :isLoadingTable="false"
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
        <b-tab-item label="Tablespaces">
          <FullTable
            :tableData="data.tablespaces"
            :keys="['name', 'status', 'usedPerc', 'used', 'total', 'maxSize']"
            :isLoadingTable="false"
          >
            <template slot="headData">
              <v-th sortKey="name">Name</v-th>
              <v-th sortKey="status">Status</v-th>
              <v-th sortKey="usedPerc">Used</v-th>
              <v-th sortKey="used">Used GB</v-th>
              <v-th sortKey="total">Total</v-th>
              <v-th sortKey="maxSize">Max Size</v-th>
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
        <b-tab-item label="Grant Role">
          <FullTable
            :tableData="data.grantDba"
            :keys="['adminOption', 'defaultRole', 'grantee']"
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
        <b-tab-item label="Segment Advisors">
          <FullTable
            :tableData="data.segmentAdvisors"
            :keys="[
              'segmentOwner',
              'segmentName',
              'segmentType',
              'partitionName',
              'recommendation',
            ]"
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
        <b-tab-item label="Partitioning">
          <FullTable
            :tableData="data.partitionings"
            :keys="[
              'date',
              'mb',
              'owner',
              'partitionName',
              'segmentName',
              'segmentType',
            ]"
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
          <RangeDates :setRange="SET_RANGE_DATES_ALT" class="mt-0 mr-0" />
          <DbGrowth
            :data="getOraclePdbsDbGrowth(null, pdbName)"
            :dataID="`dbGrowth-${pdbName}`"
            class="mt-3"
          />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import DbGrowth from '@/components/common/DbGrowth.vue'
import RangeDates from '@/components/common/RangeDates.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'

export default {
  name: 'oracle-databases-pdbs-page-modal',
  props: ['pdbName', 'hostname', 'tab', 'data'],
  components: {
    FullTable,
    TdContent,
    TdIcon,
    DbGrowth,
    RangeDates,
    SimpleTable,
  },
  data() {
    return {
      activeTab: 0,
      isMounted: false,
    }
  },
  beforeMount() {
    this.activeTab = this.tab

    this.getPdbsByHostDbGrothData(this.hostname)
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getPdbsByHostDbGrothData']),
    ...mapMutations(['SET_RANGE_DATES_ALT']),
  },
  computed: {
    ...mapGetters(['getOraclePdbsDbGrowth']),
  },
}
</script>

<style lang="scss" scoped></style>
