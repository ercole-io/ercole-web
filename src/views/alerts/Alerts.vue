<template>
  <section>
    <b-loading
      slot="loading"
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <DrawerFilters title="Alerts Filters">
      <form @submit.prevent="applyFilters">
        <b-field label="Status" custom-class="is-small">
          <b-select
            v-model="alertStatus"
            size="is-small"
            placeholder="Select a Status"
            expanded
          >
            <option value="NEW">NEW</option>
            <option value="ACK">ACK</option>
            <option value="">All</option>
          </b-select>
        </b-field>

        <b-field label="Type" custom-class="is-small">
          <b-select
            v-model="filters.alertCategory"
            size="is-small"
            placeholder="Select a Type"
            expanded
          >
            <option :value="null" v-if="filters.alertCategory">
              Reset
            </option>
            <option
              v-for="(cat, index) in categoryOptions"
              :key="index"
              :value="cat"
            >
              {{ cat }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Date" custom-class="is-small">
          <b-datepicker
            v-model="startDate"
            size="is-small"
            placeholder="Start Date"
            position="is-bottom-right"
            icon="calendar-today"
            :max-date="new Date()"
            :date-formatter="formatDate"
            class="mr-1"
            trap-focus
          />
          <b-datepicker
            :disabled="!startDate"
            v-model="endDate"
            size="is-small"
            placeholder="End Date"
            position="is-bottom-left"
            icon="calendar-today"
            :min-date="startDate"
            :max-date="new Date()"
            :date-formatter="formatDate"
            class="ml-1"
            trap-focus
          />
        </b-field>

        <b-field label="Severity" custom-class="is-small">
          <b-select
            v-model="filters.alertSeverity"
            size="is-small"
            placeholder="Select a Severity"
            expanded
          >
            <option :value="null" v-if="filters.alertSeverity">
              Reset
            </option>
            <option
              v-for="(sev, index) in severityOptions"
              :key="index"
              :value="sev"
            >
              {{ sev }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Hostname" custom-class="is-small">
          <b-autocomplete
            v-model="filters.hostname"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="
              setFilteredAutocomplete($event, 'hostname', getAlerts(type, flag))
            "
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Code" custom-class="is-small">
          <b-autocomplete
            v-model="filters.alertCode"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="
              setFilteredAutocomplete(
                $event,
                'alertCode',
                getAlerts(type, flag)
              )
            "
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Description" custom-class="is-small">
          <b-autocomplete
            v-model="filters.description"
            size="is-small"
            type="number"
            clearable
            :data="filteredData"
            @typing="
              setFilteredAutocomplete(
                $event,
                'description',
                getAlerts(type, flag)
              )
            "
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <div
          class="buttons is-flex mt-5"
          style="justify-content: space-between;"
        >
          <b-button type="is-danger" size="is-small" @click="resetFilters">
            Reset
          </b-button>
          <b-button type="is-primary" size="is-small" native-type="submit">
            Apply
          </b-button>
        </div>
      </form>
    </DrawerFilters>
    <BoxContent>
      <FullTable
        placeholder="Search on Alerts"
        :keys="keys"
        :tableData="getAlerts(type, flag)"
        class="table-alerts"
        @pageRows="
          vals => {
            currentPageSelection = vals
          }
        "
        @isPageChanged="handleClearAllSelections"
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
                Select all {{ getAlerts(type, flag).length }} alerts?
              </a>
            </span>

            <span
              class="is-size-7"
              v-if="isAllPagesSelected && isCurrentPageSelected"
            >
              <span class="px-2">
                All {{ getAlerts(type, flag).length }} alerts are selected.
              </span>
              <a @click="handleClearAllSelections">
                Clear select all?
              </a>
            </span>
          </div>

          <div v-if="type && flag" style="padding-left: 20px;">
            <b-button
              type="is-primary"
              size="is-small"
              class="has-text-weight-semibold mr-3"
              @click="removeUrlParams"
            >
              Show All
            </b-button>
          </div>
        </template>

        <template slot="headData">
          <th style="width: 5%">
            <div v-if="flag !== 'AGENT' && alertStatus !== 'ACK'">
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
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import {
  checkAlertIcon,
  prepareDataForAutocomplete
} from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DrawerButton from '@/components/common/DrawerButton.vue'
import DrawerFilters from '@/components/common/DrawerFilters.vue'
import formatDate from '@/filters/formatDate.js'

const checkOrUncheck = (list, status, handleSelectRows) => {
  _.map(list, val => {
    val.isChecked = status
    return handleSelectRows(val.isChecked, val._id)
  })
}

export default {
  mixins: [paginationMixin, localFiltersMixin],
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
    HostLink,
    DrawerButton,
    DrawerFilters
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
      selectedRows: [],
      isCurrentPageSelected: false,
      currentPageSelection: [],
      isAllPagesSelected: false,
      isLoading: false,
      startDate: null,
      endDate: null,
      alertStatus: 'NEW',
      categoryOptions: [],
      severityOptions: []
    }
  },
  async beforeMount() {
    await this.applyApiParams()

    this.configAutocomplete()
  },
  methods: {
    ...mapActions(['getAlertsData', 'markAsReadAlertsPage']),
    applyApiParams() {
      return new Promise((resolve, reject) => {
        this.getAlertsData({
          status: this.alertStatus,
          startDate: moment(this.startDate)
            .subtract(1, 'days')
            .utc()
            .set({ hour: 23, minute: 59, second: 59 })
            .toISOString(),
          endDate: moment(this.endDate)
            .utc()
            .set({ hour: 23, minute: 59, second: 59 })
            .toISOString()
        }).then(
          res => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    },
    applyFilters() {
      if (this.startDate || this.endDate) {
        this.applyApiParams().then(() => {
          this.apply()
        })
      } else {
        this.apply()
      }
    },
    resetFilters() {
      this.reset()
      this.startDate = null
      this.endDate = null
      this.alertStatus = 'NEW'
    },
    configAutocomplete() {
      this.setAutocompleteData('hostname', this.getAlerts(this.type, this.flag))
      this.setAutocompleteData(
        'alertCode',
        this.getAlerts(this.type, this.flag)
      )
      this.setAutocompleteData(
        'description',
        this.getAlerts(this.type, this.flag)
      )

      this.categoryOptions = prepareDataForAutocomplete(
        this.getAlerts(this.type, this.flag),
        'alertCategory'
      )

      this.severityOptions = prepareDataForAutocomplete(
        this.getAlerts(this.type, this.flag),
        'alertSeverity'
      )
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
      this.isLoading = true
      const idList = this.selectedRows
      this.markAsReadAlertsPage({ idList }).then(() => {
        this.getAlerts(this.type, this.flag)
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
        this.getAlerts(this.type, this.flag),
        this.isAllPagesSelected,
        this.handleSelectRows
      )
    },
    handleClearAllSelections() {
      this.isAllPagesSelected = false
      checkOrUncheck(
        this.getAlerts(this.type, this.flag),
        this.isAllPagesSelected,
        this.handleSelectRows
      )
    },
    removeUrlParams() {
      return this.$router.replace({
        name: 'alerts'
      })
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getAlerts'])
  },
  watch: {
    selectedRows(value) {
      if (value.length < this.perPage) {
        this.isCurrentPageSelected = false
      } else {
        this.isCurrentPageSelected = true
      }
    },
    alertStatus(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.applyApiParams().then(() => {
          this.apply()
        })
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
