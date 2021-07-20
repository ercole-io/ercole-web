<template>
  <BaseLayoutColumns v-if="isMounted">
    <b-loading
      slot="loading"
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    />
    <AlertsFilters slot="col1" />
    <FullTable
      slot="col2"
      :placeholder="$t('menu.alerts')"
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
            {{ $t('views.alerts.markRead') }}
          </b-button>

          <span
            class="is-size-7"
            v-if="!isAllPagesSelected && isCurrentPageSelected"
          >
            <span class="px-2">
              {{ $t('views.alerts.selected', [currentPageSelection.length]) }}
            </span>
            <a @click="handleSelectAllPagesRows">
              {{ $t('views.alerts.selectAll', [getAlerts.length]) }}
            </a>
          </span>

          <span
            class="is-size-7"
            v-if="isAllPagesSelected && isCurrentPageSelected"
          >
            <span class="px-2">
              {{ $t('views.alerts.allAlerts', [getAlerts.length]) }}
            </span>
            <a @click="handleClearAllSelections">
              {{ $t('views.alerts.clearAll') }}
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
            {{ $t('views.alerts.showAll') }}
          </b-button>
        </div>
      </template>

      <template slot="headData">
        <th style="width: 5%; z-index: 1;">
          <div v-if="showCheckbox">
            <b-checkbox
              v-model="isCurrentPageSelected"
              @input="handleSelectPageRows"
            />
          </div>
        </th>
        <v-th style="width: 10%" sortKey="alertCategory">
          {{ $t('common.collumns.type') }}
        </v-th>
        <v-th style="width: 10%" sortKey="date">
          {{ $t('common.collumns.date') }}
        </v-th>
        <v-th style="width: 5%" :sortKey="alertSeveritySort">
          {{ $t('common.collumns.severity') }}
        </v-th>
        <v-th style="width: 20%" sortKey="hostname">
          {{ $t('common.collumns.hostname') }}
        </v-th>
        <v-th style="width: 10%" sortKey="alertCode">
          {{ $t('common.collumns.code') }}
        </v-th>
        <v-th style="width: 40%;" sortKey="description">
          {{ $t('common.collumns.description') }}
        </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <td
          class="py-0 px-0"
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
            class="is-flex is-justify-content-center"
            style="height: 32px; z-index: 0;"
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

        <TdContent
          :value="rowData.scope.description"
          tooltipPlace="left"
          v-if="rowData.scope.description.length < 100"
        />
        <td v-if="rowData.scope.description.length > 100">
          <b-icon
            v-tooltip="options($t('common.general.fullDesc'))"
            type="is-primary"
            class="delete-icon"
            pack="fas"
            icon="file-alt"
            @click.native="descriptionAlert(rowData.scope)"
          />
          {{ rowData.scope.description }}
        </td>
      </template>

      <ExportButton
        slot="export"
        :url="`alerts?status=${alertStatus}`"
        expName="alerts-data"
      />
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import AlertsFilters from '@/components/alerts/AlertsFilters.vue'
import formatDateTime from '@/filters/formatDateTime.js'

const checkOrUncheck = (list, status, handleSelectRows) => {
  _.map(list, val => {
    if (val.alertCategory !== 'AGENT') {
      val.isChecked = status
      return handleSelectRows(val.isChecked, val._id)
    }
  })
}

export default {
  mixins: [paginationMixin, localFiltersMixin, hostnameLinkRow, TooltipMixin],
  components: {
    BaseLayoutColumns,
    FullTable,
    ExportButton,
    TdContent,
    TdIcon,
    HostLink,
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
      isMounted: false,
      alertStatus: 'NEW'
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
      const idList = _.uniqWith(this.selectedRows, _.isEqual)
      this.markAsReadAlertsPage({ idList }).then(() => {
        this.getAlerts
        this.isCurrentPageSelected = false
        this.isLoading = false
        this.selectedRows = []
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
    descriptionAlert(info) {
      this.$buefy.dialog.alert({
        title: this.$i18n.t('views.alerts.descModalTitle'),
        message: `
          <b>${info.alertCode}</b> 
          </br> 
          ${info.hostname} 
          </br> 
          ${info.alertCategory} 
          </br> 
          ${formatDateTime(info.date)} 
          </br></br> 
          ${info.description}
        `,
        confirmText: this.$i18n.t('common.general.close'),
        size: 'is-small',
        hasIcon: true,
        iconPack: 'mdi',
        icon: this.resolveIcon(info.alertSeverity)[0],
        type: this.resolveIcon(info.alertSeverity)[1]
      })
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
