<template>
  <section>
    <BoxContent>
      <FullTable
        placeholder="Search on Alerts"
        :filters="filters"
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
          <td>{{ rowData.scope.alertCategory }}</td>
          <td>{{ rowData.scope.date }}</td>
          <td>
            <b-icon
              pack="fas"
              :type="setIcon(rowData.scope.alertSeverity).iconType"
              :icon="setIcon(rowData.scope.alertSeverity).icon"
            />
          </td>
          <td>{{ rowData.scope.hostname }}</td>
          <td>{{ rowData.scope.alertCode }}</td>
          <td>{{ rowData.scope.description }}</td>
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
    exportButton
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: [
            'alertCategory',
            'alertSeverity',
            'date',
            'hostname',
            'alertCode',
            'description'
          ]
        }
      },
      data: []
    }
  },
  async beforeMount() {
    if (!this.type && !this.flag) {
      await this.fetchAlerts()
    } else if (this.flag === 'AGENT') {
      this.showFilteredAgents()
    } else {
      this.showFilteredAlerts()
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
    setIcon(severity) {
      return checkAlertIcon(severity)
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
    ...mapGetters(['getAllAlerts', 'getFilteredAlerts', 'getFilteredAgents'])
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
