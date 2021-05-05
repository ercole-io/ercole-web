<template>
  <div class="columns">
    <div class="column is-2">
      <PatchAdvisorFilters v-if="isMounted" />
    </div>
    <div class="column is-10">
      <FullTable
        placeholder="Search on Oracle Patch Advisor"
        :keys="keys"
        :tableData="getOraclePatchAdvisor"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="dbname">Database</v-th>
          <v-th sortKey="dbver">Version</v-th>
          <v-th sortKey="date">Release Date</v-th>
          <v-th sortKey="description">PSU</v-th>
          <v-th sortKey="fourMonths.text">4 Month</v-th>
          <v-th sortKey="sixMonths.text">6 Month</v-th>
          <v-th sortKey="twelveMonths.text">12 Month</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <HostLink
            :hostname="[rowData.scope.hostname, rowData.scope.dbname]"
          />
          <TdContent :value="rowData.scope.dbname" />
          <TdContent :value="rowData.scope.dbver" />
          <TdContent :value="rowData.scope.date" dataType="date" />
          <TdContent :value="rowData.scope.description" />
          <TdIcon :value="rowData.scope.fourMonths.month" />
          <TdIcon :value="rowData.scope.sixMonths.month" />
          <TdIcon :value="rowData.scope.twelveMonths.month" />
        </template>

        <exportButton
          slot="export"
          url="hosts/technologies/oracle/databases/patch-advisors"
          expName="oraclePatchAdvisor"
        />
      </FullTable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import PatchAdvisorFilters from '@/components/databases/oracle/patchAdvisor/PatchAdvisorFilters.vue'

export default {
  mixins: [hostnameLinkRow],
  components: {
    FullTable,
    exportButton,
    TdContent,
    TdIcon,
    HostLink,
    PatchAdvisorFilters
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbname',
        'dbver',
        'date',
        'description',
        'fourMonths.text',
        'sixMonths.text',
        'twelveMonths.text'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getPatchAdvisor().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getPatchAdvisor'])
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
