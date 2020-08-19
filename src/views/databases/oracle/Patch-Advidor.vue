<template>
  <section>
    <FullTable
      placeholder="Search on Oracle Patch Advisor"
      :filters="filters"
      :tableData="data"
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
        <TdContent :value="rowData.scope.hostname" />
        <TdContent :value="rowData.scope.dbname" />
        <TdContent :value="rowData.scope.dbver" />
        <TdContent :value="rowData.scope.createdAt | formatDate" />
        <TdContent :value="rowData.scope.description" />
        <TdIcon :value="dateBetweenMonthRange(rowData.scope.createdAt, 4)" />
        <TdIcon :value="dateBetweenMonthRange(rowData.scope.createdAt, 6)" />
        <TdIcon :value="dateBetweenMonthRange(rowData.scope.createdAt, 12)" />
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
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  components: {
    FullTable,
    exportButton,
    TdContent,
    TdIcon
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
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
      data: []
    }
  },
  async beforeMount() {
    await this.getPatchAdvisor()
    this.data = this.oraclePatchAdvisor.patchAdvisor
  },
  methods: {
    ...mapActions(['getPatchAdvisor']),
    dateBetweenMonthRange(date, month) {
      const startDate = moment()
        .subtract(month, 'month')
        .format('YYYY-MM-DD')
      const endDate = moment().format('YYYY-MM-DD')
      const dateToCheck = moment(date).format('YYYY-MM-DD')

      return moment(dateToCheck).isBetween(startDate, endDate)
        ? ['circle', 'fas', 'is-success', 'yes']
        : ['circle', 'fas', 'is-danger', 'no']
    }
  },
  computed: {
    ...mapState(['oraclePatchAdvisor'])
  }
}
</script>

<style lang="scss" scoped></style>
