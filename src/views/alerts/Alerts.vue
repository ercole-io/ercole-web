<template>
  <section>
    <BoxContent>
      <FullTable
        placeholder="Search on Alerts"
        :keys="keys"
        :tableData="data"
        :clickedRow="() => []"
        class="table-alerts"
      >
        <template slot="headData">
          <th style="width: 5%">Actions</th>
          <v-th style="width: 10%" sortKey="alertCategory">Type</v-th>
          <v-th style="width: 10%" sortKey="date">Date</v-th>
          <v-th style="width: 5%" sortKey="alertSeverity">Severity</v-th>
          <v-th style="width: 20%" sortKey="hostname">Hostname</v-th>
          <v-th style="width: 10%" sortKey="alertCode">Code</v-th>
          <v-th style="width: 40%" sortKey="description">Description</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td>
            <b-button
              v-if="rowData.scope.alertCategory !== 'AGENT'"
              @click="
                handleMarkAsRead(
                  rowData.scope._id,
                  rowData.scope.alertCategory,
                  rowData.scope.alertSeverity
                )
              "
              type="is-primary"
              size="is-small"
              icon-pack="fas"
              icon-left="check-circle"
              class="has-text-weight-semibold"
            >
              Mark as Read
            </b-button>
          </td>
          <TdContent :value="rowData.scope.alertCategory" />
          <TdContent :value="rowData.scope.date" />
          <TdIcon :value="resolveIcon(rowData.scope.alertSeverity)" />
          <TdContent :value="rowData.scope.hostname" />
          <TdContent :value="rowData.scope.alertCode" />
          <TdContent :value="rowData.scope.description" />
        </template>

        <exportButton slot="export" url="alerts" expName="alerts-data" />
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  mixins: [paginationMixin],
  props: {
    type: {
      type: String,
      default: null
    },
    flag: {
      type: String,
      default: null
    }
  },
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent,
    TdIcon
  },
  data() {
    return {
      keys: [
        'alertCategory',
        'alertSeverity',
        'date',
        'hostname',
        'alertCode',
        'description'
      ],
      data: []
    }
  },
  async beforeMount() {
    if (!this.type && !this.flag) {
      await this.fetchAlerts()
    } else if (this.type === 'NO_DATA') {
      this.showFilteredAgents()
    } else if (
      this.type === 'INFO' ||
      this.type === 'WARNING' ||
      this.type === 'CRITICAL'
    ) {
      this.showFilteredAlerts()
    } else if (this.type !== 'NO_DATA' && this.flag === 'AGENT') {
      this.showFilteredAgentsByHost()
    } else if (this.type !== 'NO_DATA' && this.flag !== 'AGENT') {
      this.showFilteredAlertsByHost()
    }
  },
  methods: {
    ...mapActions(['getAlertsData', 'markAsRead']),
    fetchAlerts() {
      this.getAlertsData()
      this.data = this.getAllAlerts
    },
    showAllAlerts() {
      this.data = this.getAllAlerts
    },
    showFilteredAgents() {
      this.data = this.getFilteredAgents(this.type, this.flag)
    },
    showFilteredAlerts() {
      this.data = this.getFilteredAlerts(this.type, this.flag)
    },
    showFilteredAgentsByHost() {
      this.data = this.getFilteredAgentsByHost(this.type, this.flag)
    },
    showFilteredAlertsByHost() {
      this.data = this.getFilteredAlertsByHost(this.type, this.flag)
    },
    setIcon(severity) {
      return checkAlertIcon(severity)
    },
    resolveIcon(value) {
      return [
        this.setIcon(value).icon,
        this.setIcon(value).iconType,
        value,
        'mdi-24px'
      ]
    },
    handleMarkAsRead(id, flag, type) {
      this.markAsRead({ id, flag, type }).then(() => {
        if (!this.type && !this.flag) {
          this.showAllAlerts()
        } else if (this.flag === 'AGENT') {
          this.showFilteredAgents()
        } else {
          this.showFilteredAlerts()
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getAllAlerts',
      'getFilteredAlerts',
      'getFilteredAgents',
      'getFilteredAlertsByHost',
      'getFilteredAgentsByHost'
    ])
  }
}
</script>

<style lang="scss">
.table-alerts {
  thead {
    tr {
      th {
        &:first-child {
          text-align: center !important;
        }
        &:last-child {
          text-align: left !important;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        &:first-child {
          text-align: center;
        }
        &:last-child {
          text-align: left;
        }
      }
    }
  }
}
</style>
