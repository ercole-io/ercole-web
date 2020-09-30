<template>
  <section>
    <BoxContent>
      <FullTable
        placeholder="Search on Alerts"
        :keys="keys"
        :tableData="data"
        class="table-alerts"
        @pageRows="
          vals => {
            currentPageSelection = vals
          }
        "
        @isPageChanged="handleClearAllSelections"
      >
        <template>
          <div
            slot="customTopHeader"
            v-if="isCurrentPageSelected || selectedRows.length > 0"
          >
            <b-button
              type="is-primary"
              size="is-small"
              icon-pack="fas"
              icon-left="check-circle"
              class="has-text-weight-semibold mr-3"
              @click="handleMarkAsRead"
            >
              Mark as Read
            </b-button>

            <span
              class="is-size-7"
              v-if="!isAllPagesSelected && isCurrentPageSelected"
            >
              <span class="px-2">
                All {{ currentPageSelection.length }} alerts on this page are
                selected.
              </span>
              <a @click="handleSelectAllPagesRows">
                Select all {{ data.length }} alerts?
              </a>
            </span>

            <span
              class="is-size-7"
              v-if="isAllPagesSelected && isCurrentPageSelected"
            >
              <span class="px-2">
                All {{ data.length }} alerts are selected.
              </span>
              <a @click="handleClearAllSelections">
                Clear selection?
              </a>
            </span>
          </div>
        </template>

        <template slot="headData">
          <th style="width: 5%">
            <div v-if="flag !== 'AGENT'">
              <b-checkbox
                v-model="isCurrentPageSelected"
                @input="handleSelectPageRows"
              />
            </div>
          </th>
          <v-th style="width: 10%" sortKey="alertCategory">Type</v-th>
          <v-th style="width: 10%" sortKey="date">Date</v-th>
          <v-th style="width: 5%" sortKey="alertSeverity">Severity</v-th>
          <v-th style="width: 20%" sortKey="hostname">Hostname</v-th>
          <v-th style="width: 10%" sortKey="alertCode">Code</v-th>
          <v-th style="width: 40%" sortKey="description">Description</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td v-if="rowData.scope.alertCategory !== 'AGENT'">
            <b-checkbox
              v-model="rowData.scope.isChecked"
              @input="
                handleSelectRows(rowData.scope.isChecked, rowData.scope._id)
              "
            />
          </td>
          <td v-else></td>
          <TdContent :value="rowData.scope.alertCategory" />
          <TdContent :value="formatDate(rowData.scope.date)" />
          <TdIcon :value="resolveIcon(rowData.scope.alertSeverity)" />
          <HostLink :hostname="rowData.scope.hostname" />
          <TdContent :value="rowData.scope.alertCode" />
          <TdContent :value="rowData.scope.description" />
        </template>

        <exportButton slot="export" url="alerts" expName="alerts-data" />
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import formatDate from '@/filters/formatDate.js'

const checkOrUncheck = (list, status, handleSelectRows) => {
  _.map(list, val => {
    val.isChecked = status
    return handleSelectRows(val.isChecked, val._id)
  })
}

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
    TdIcon,
    HostLink
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
      data: [],
      selectedRows: [],
      isCurrentPageSelected: false,
      currentPageSelection: [],
      isAllPagesSelected: false
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
    ...mapActions(['getAlertsData', 'markAsReadAlertsPage']),
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
    handleMarkAsRead() {
      const idList = this.selectedRows
      this.markAsReadAlertsPage({ idList }).then(() => {
        if (!this.type && !this.flag) {
          this.showAllAlerts()
        } else if (this.flag === 'AGENT') {
          this.showFilteredAgents()
        } else {
          this.showFilteredAlerts()
        }
        this.isCurrentPageSelected = false
      })
    },
    handleSelectRows(status, id) {
      if (status) {
        this.selectedRows.push(id)
      } else {
        this.selectedRows = _.filter(this.selectedRows, val => {
          return val !== id
        })
      }
    },
    handleSelectPageRows(checked) {
      if (checked) {
        checkOrUncheck(this.currentPageSelection, true, this.handleSelectRows)
      } else {
        checkOrUncheck(this.currentPageSelection, false, this.handleSelectRows)
      }
    },
    handleSelectAllPagesRows() {
      this.isAllPagesSelected = true
      checkOrUncheck(this.data, true, this.handleSelectRows)
    },
    handleClearAllSelections() {
      this.isAllPagesSelected = false
      checkOrUncheck(this.data, false, this.handleSelectRows)
    },
    formatDate(date) {
      return formatDate(date)
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
  },
  watch: {
    selectedRows(value) {
      if (value.length < this.perPage) {
        this.isCurrentPageSelected = false
      } else {
        this.isCurrentPageSelected = true
      }
    }
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
