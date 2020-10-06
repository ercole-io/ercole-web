<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Patch Advisor"
      :keys="keys"
      :tableData="getOraclePatchAdvisor"
      :clickedRow="() => []"
    >
      <template slot="headData">
        <v-th sortKey="hostname">Hostname</v-th>
        <v-th sortKey="dbname">Database</v-th>
        <v-th sortKey="dbver">Version</v-th>
        <v-th sortKey="date">Release Date</v-th>
        <v-th sortKey="description">PSU</v-th>
        <v-th sortKey="fourMonth">4 Month</v-th>
        <v-th sortKey="sixMonth">6 Month</v-th>
        <v-th sortKey="twelveMonth">12 Month</v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <HostLink :hostname="rowData.scope.hostname" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.dbver" />
        <TdContent :value="rowData.scope.date" dataType="date" />
        <TdContent :value="rowData.scope.description" />
        <TdIcon :value="dateBetweenMonthRange(rowData.scope.date, 4)" />
        <TdIcon :value="dateBetweenMonthRange(rowData.scope.date, 6)" />
        <TdIcon :value="dateBetweenMonthRange(rowData.scope.date, 12)" />
      </template>

      <exportButton
        slot="export"
        url="/hosts/technologies/oracle/databases/patch-advisors"
        expName="oraclePatchAdvisor"
      />
    </FullTable>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'

export default {
  components: {
    FullTable,
    exportButton,
    TdContent,
    TdIcon,
    HostLink
  },
  data() {
    return {
      keys: [
        'hostname',
        'dbname',
        'dbver',
        'date',
        'description',
        'fourMonth',
        'sixMonth',
        'twelveMonth'
      ]
    }
  },
  async beforeMount() {
    await this.getPatchAdvisor()
  },
  methods: {
    ...mapActions(['getPatchAdvisor']),
    dateBetweenMonthRange(date, month) {
      const startDate = moment()
        .subtract(month, 'month')
        .format('YYYY-MM-DD')
      const endDate = moment()
        .add(1, 'days')
        .format('YYYY-MM-DD')
      const dateToCheck = moment(date).format('YYYY-MM-DD')

      return moment(dateToCheck).isBetween(startDate, endDate)
        ? ['check-circle', 'is-success', 'yes']
        : ['minus-circle', 'is-danger', 'no']
    }
  },
  computed: {
    ...mapGetters(['getOraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
