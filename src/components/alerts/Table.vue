<template>
  <FullTable
    :tableData="getAlerts"
    :setColumns="columns"
    sortField="date"
    :fnCallback="() => getAlertsData()"
    hasCheckbox
    :rowsNotCheckable="
      (row) =>
        row.alertCategory !== 'AGENT' &&
        row.alertStatus !== 'ACK' &&
        row.alertStatus !== 'DISMISSED'
    "
    hasExportButton
    :exportInfo="['alerts?status=NEW', 'alerts-data']"
  />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'

export default {
  components: {
    FullTable,
  },
  data() {
    return {
      columns: [
        {
          field: 'alertCategory',
          label: 'Type',
          centered: true,
          sortable: true,
        },
        {
          field: 'date',
          label: 'Date',
          centered: true,
          sortable: true,
        },
        {
          field: 'alertSeverity',
          label: 'Severity',
          centered: true,
          sortable: true,
        },
        {
          field: 'hostname',
          label: 'Hostname',
          centered: true,
          sortable: true,
        },
        {
          field: 'alertCode',
          label: 'Code',
          centered: true,
          sortable: true,
        },
        {
          field: 'description',
          label: 'Description',
          centered: true,
          sortable: true,
          width: '40%',
        },
      ],
    }
  },
  beforeMount() {
    bus.$on('getRowSelected', (data) => {
      // handle mark as read
      console.log(data)
    })

    bus.$on('searchTherm', () => {
      this.getAlertsData()
    })
  },
  methods: {
    ...mapActions(['getAlertsData']),
  },
  computed: {
    ...mapGetters(['getAlerts']),
  },
}
</script>

<style lang="scss" scoped></style>
