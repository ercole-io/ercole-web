<template>
  <section>
    <b-loading
      slot="loading"
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    />

    <AlertsFilters v-if="isMounted" />

    <BoxContent>
      <FullTable
        placeholder="Search on Alerts"
        :keys="keys"
        :tableData="getAlerts"
        class="table-alerts"
        @pageRows="
          vals => {
            currentPageSelection = vals
          }
        "
        @isPageChanged="handleClearAllSelections"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <template slot="customTopHeader">
          <DrawerButton tooltipText="More Filters" />

          <div
            v-if="isCurrentPageSelected || selectedRows.length > 0"
            style="margin-right: auto;"
          >
            <b-button
              type="is-primary"
              size="is-small"
              icon-pack="fas"
              icon-left="check-circle"
              class="has-text-weight-semibold mr-3 ml-3"
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
                Select all {{ getAlerts.length }} alerts?
              </a>
            </span>

            <span
              class="is-size-7"
              v-if="isAllPagesSelected && isCurrentPageSelected"
            >
              <span class="px-2">
                All {{ getAlerts.length }} alerts are selected.
              </span>
              <a @click="handleClearAllSelections">
                Clear select all?
              </a>
            </span>
          </div>

          <div v-if="alerts.params.category" style="padding-left: 20px;">
            <b-button
              type="is-primary"
              size="is-small"
              class="has-text-weight-semibold mr-3"
              @click="removeParams"
            >
              Show All
            </b-button>
          </div>
        </template>

        <template slot="headData">
          <th style="width: 5%">
            <div v-if="showCheckbox">
              <b-checkbox
                v-model="isCurrentPageSelected"
                @input="handleSelectPageRows"
              />
            </div>
          </th>
          <v-th style="width: 10%" sortKey="alertCategory">Type</v-th>
          <v-th style="width: 10%" sortKey="date">Date</v-th>
          <v-th style="width: 5%" :sortKey="alertSeveritySort">Severity</v-th>
          <v-th style="width: 20%" sortKey="hostname">Hostname</v-th>
          <v-th style="width: 10%" sortKey="alertCode">Code</v-th>
          <v-th style="width: 40%" sortKey="description">Description</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <td
            v-if="
              rowData.scope.alertCategory !== 'AGENT' &&
                rowData.scope.alertStatus === 'NEW'
            "
          >
            <b-checkbox
              v-model="rowData.scope.isChecked"
              @input="
                handleSelectRows(rowData.scope.isChecked, rowData.scope._id)
              "
            />
          </td>
          <td v-else></td>
          <TdContent :value="rowData.scope.alertCategory" />
          <TdContent :value="rowData.scope.date" dataType="date" />
          <TdIcon :value="resolveIcon(rowData.scope.alertSeverity)" />
          <HostLink
            :hostname="rowData.scope.hostname ? rowData.scope.hostname : '-'"
          />
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
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import AlertsFilters from '@/components/alerts/AlertsFilters.vue'
import formatDate from '@/filters/formatDate.js'

const checkOrUncheck = (list, status, handleSelectRows) => {
  _.map(list, val => {
    if (val.alertCategory !== 'AGENT') {
      val.isChecked = status
      return handleSelectRows(val.isChecked, val._id)
    }
  })
}

export default {
  mixins: [paginationMixin, localFiltersMixin, hostnameLinkRow],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent,
    TdIcon,
    HostLink,
    DrawerButton,
    AlertsFilters
  },
  data() {
    return {
      keys: [
        'alertCategory',
        'date',
        'hostname',
        'alertCode',
        'description',
        'alertSeverity'
      ],
      selectedRows: [],
      isCurrentPageSelected: false,
      currentPageSelection: [],
      isAllPagesSelected: false,
      isLoading: false,
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getAlertsData({ status: this.alertStatus }).then(
      () => (this.isMounted = true)
    )
  },
  methods: {
    ...mapActions(['getAlertsData', 'markAsReadAlertsPage']),
    ...mapMutations(['SET_ALERTS_PARAMS']),
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
      this.isLoading = true
      const idList = this.selectedRows
      this.markAsReadAlertsPage({ idList }).then(() => {
        this.getAlerts
        this.isCurrentPageSelected = false
        this.isLoading = false
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
      checked
        ? checkOrUncheck(this.currentPageSelection, true, this.handleSelectRows)
        : checkOrUncheck(
            this.currentPageSelection,
            false,
            this.handleSelectRows
          )
    },
    handleSelectAllPagesRows() {
      this.isAllPagesSelected = true
      checkOrUncheck(
        this.getAlerts,
        this.isAllPagesSelected,
        this.handleSelectRows
      )
    },
    handleClearAllSelections() {
      this.isAllPagesSelected = false
      checkOrUncheck(
        this.getAlerts,
        this.isAllPagesSelected,
        this.handleSelectRows
      )
    },
    alertSeveritySort(row) {
      return row.alertSeverity.length
    },
    removeParams() {
      bus.$emit('onResetAction')
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapState(['alerts']),
    ...mapGetters(['getAlerts', 'showCheckbox'])
  },
  watch: {
    selectedRows(value) {
      if (value.length < this.perPage) {
        this.isCurrentPageSelected = false
      } else {
        this.isCurrentPageSelected = true
      }
    }
  },
  beforeDestroy() {
    this.removeParams()
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
