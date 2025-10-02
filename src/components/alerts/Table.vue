<template>
  <FullTable
    :tableData="getAlerts"
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
    hasRefreshButton
    :refreshButtonAction="updateAlerts"
  >
    <template
      slot="checkboxActions"
      v-if="selectedRows && selectedRows.length > 0"
    >
      <b-button
        :label="`Clear All selected (${selectedRows.length})`"
        size="is-small"
        type="is-dark"
        icon-left="close"
        @click="handleSelectClear"
      />
      <b-button
        :label="$t('views.alerts.markRead')"
        type="is-primary"
        size="is-small"
        icon-pack="fas"
        icon-left="check-circle"
        class="has-text-weight-semibold mr-2 ml-2"
        @click="handleMarkAsRead"
      />
    </template>

    <template slot="cols">
      <b-table-column
        field="alertCategory"
        label="Type"
        centered
        sortable
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.alertCategory)"
          v-html="highlight(props.row.alertCategory)"
        />
      </b-table-column>
      <b-table-column
        field="date"
        label="Date"
        centered
        sortable
        v-slot="props"
      >
        <span v-tooltip="options(props.row.date)">
          {{ props.row.date }}
        </span>
      </b-table-column>
      <b-table-column field="alertSeverity" label="Severity" centered sortable>
        <template v-slot="props">
          <b-icon
            v-tooltip="options(resolveIcon(props.row.alertSeverity)[2])"
            :custom-size="resolveIcon(props.row.alertSeverity)[3]"
            :icon="resolveIcon(props.row.alertSeverity)[0]"
            :type="resolveIcon(props.row.alertSeverity)[1]"
            style="width: 100%"
          />
        </template>
      </b-table-column>
      <b-table-column
        field="hostname"
        label="Hostname"
        centered
        sortable
        v-slot="props"
      >
        <a
          href="#"
          @click="hostlink($event, props.row.hostname)"
          type="is-ghost"
          v-html="highlight(props.row.hostname)"
          v-if="props.row.alertStatus !== 'DISMISSED'"
        />
        <span v-html="highlight(props.row.hostname)" v-else />
      </b-table-column>
      <b-table-column
        field="alertCode"
        label="Code"
        centered
        sortable
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.alertCode)"
          v-html="highlight(props.row.alertCode)"
        />
      </b-table-column>
      <b-table-column
        field="description"
        label="Description"
        width="40%"
        sortable
      >
        <template v-slot="props">
          <b-icon
            v-tooltip="options($t('common.general.fullDesc'))"
            type="is-primary"
            class="delete-icon is-clickable"
            pack="fas"
            icon="file-alt"
            @click.native="descriptionAlert(props.row)"
            v-if="props.row.description.length > 100"
          />
          <span
            v-tooltip="options(props.row.description)"
            v-html="highlight(props.row.description)"
          />
        </template>
      </b-table-column>
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { resolveSeverityIcon } from '@/helpers/helpers.js'
import { descriptionAlertDialog } from '@/helpers/alertsDescDialog.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'

export default {
  name: 'alerts-table-component',
  mixins: [TooltipMixin, HighlightSearchMixin],
  components: {
    FullTable,
  },
  data() {
    return {
      selectedRows: [],
    }
  },
  beforeMount() {
    bus.$on('tableCheckedRows', (data) => {
      this.selectedRows = data
    })
  },
  methods: {
    ...mapActions(['getAlertsData', 'markAsReadAlertsPage']),
    ...mapMutations(['SET_PAGE_NUM']),
    handleMarkAsRead() {
      const alertIDs = _.map(this.selectedRows, (val) => val._id)

      this.markAsReadAlertsPage(alertIDs).then(() => {
        bus.$emit('resetRowSelected')
        this.getAlertsData()
      })
    },
    handleSelectClear() {
      this.selectedRows = []
      bus.$emit('tableCheckedRows', this.selectedRows)
    },
    resolveIcon(value) {
      return resolveSeverityIcon(value)
    },
    descriptionAlert(info) {
      const data = {
        code: info.alertCode,
        host: info.hostname,
        categ: info.alertCategory,
        date: info.date,
        desc: info.description,
        severity: info.alertSeverity,
      }
      descriptionAlertDialog(data)
    },
    hostlink(e, hostname) {
      e.preventDefault()
      this.$router.push({
        name: 'hosts-details',
        params: {
          hostname: hostname,
        },
      })
    },
    updateAlerts() {
      this.SET_PAGE_NUM(1)
      this.getAlertsData()
    },
  },
  computed: {
    ...mapGetters(['getAlerts']),
  },
}
</script>

<style lang="scss" scoped></style>
