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
  >
    <template slot="cols">
      <b-table-column
        field="alertCategory"
        label="Type"
        centered
        sortable
        v-slot="props"
      >
        <span v-tooltip="options(props.row.alertCategory)">
          {{ props.row.alertCategory }}
        </span>
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
          v-if="props.row.alertStatus !== 'DISMISSED'"
        >
          {{ props.row.hostname }}
        </a>
        <span v-else>{{ props.row.hostname }}</span>
      </b-table-column>
      <b-table-column
        field="alertCode"
        label="Code"
        centered
        sortable
        v-slot="props"
      >
        <span v-tooltip="options(props.row.alertCode)">
          {{ props.row.alertCode }}
        </span>
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
          <span v-tooltip="options(props.row.description)">
            {{ props.row.description }}
          </span>
        </template>
      </b-table-column>
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import { resolveSeverityIcon } from '@/helpers/helpers.js'
import { descriptionAlertDialog } from '@/helpers/alertsDescDialog.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'

export default {
  mixins: [TooltipMixin],
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
      const alertIDs = []
      _.map(data, (val) => {
        alertIDs.push(val._id)
      })
      this.markAsReadAlertsPage(alertIDs).then(() => {
        bus.$emit('resetRowSelected')
        this.getAlertsData()
      })
    })

    bus.$on('searchTherm', () => {
      this.getAlertsData()
    })
  },
  methods: {
    ...mapActions(['getAlertsData', 'markAsReadAlertsPage']),
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
  },
  computed: {
    ...mapGetters(['getAlerts']),
  },
}
</script>

<style lang="scss" scoped></style>