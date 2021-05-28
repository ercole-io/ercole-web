<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Status">
      <CustomSelect v-model="alertStatus" :hasReset="false" fixedOptions>
        <option value="NEW">NEW</option>
        <option value="ACK">ACK</option>
        <option value="">All</option>
      </CustomSelect>
    </CustomField>

    <CustomField label="Type">
      <CustomSelect v-model="filters.alertCategory" fixedOptions>
        <option value="AGENT">AGENT</option>
        <option value="ENGINE">ENGINE</option>
        <option value="LICENSE">LICENSE</option>
      </CustomSelect>
    </CustomField>

    <CustomField label="Date">
      <b-datepicker
        v-model="startDate"
        size="is-small"
        placeholder="Start Date"
        position="is-bottom-right"
        icon="calendar-today"
        :max-date="endDate ? endDate : new Date()"
        :date-formatter="formatDate"
        class="mr-1"
        trap-focus
      />
      <b-datepicker
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
    </CustomField>

    <CustomField label="Severity">
      <CustomSelect v-model="filters.alertSeverity" fixedOptions>
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
        <option value="CRITICAL">CRITICAL</option>
      </CustomSelect>
    </CustomField>

    <CustomField label="Hostname">
      <CustomAutocomplete
        v-model="filters.hostname"
        :filterResult="filteredhostname"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Code">
      <CustomAutocomplete
        v-model="filters.alertCode"
        :filterResult="filteredalertCode"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Description">
      <CustomAutocomplete
        v-model="filters.description"
        :filterResult="filtereddescription"
        :filterMethod="setAutocompletes"
      />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['hostname', 'alertCode', 'description'],
      alertStatus: 'NEW',
      startDate: null,
      endDate: null,
      filters: {
        alertCategory: null,
        alertSeverity: null
      }
    }
  },
  created() {
    this.fullData = this.getAlerts

    this.filters = {
      alertCategory: this.alerts.params.category,
      alertSeverity: this.alerts.params.severity,
      hostname: this.alerts.params.hostname
    }
    this.apply()
  },
  methods: {
    ...mapActions(['getAlertsData']),
    applyApiParams() {
      return new Promise((resolve, reject) => {
        this.getAlertsData({
          status: this.alertStatus,
          startDate: formatDatepickerDate(this.startDate, 'compare'),
          endDate: formatDatepickerDate(this.endDate)
        }).then(
          res => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    },
    resetFilters() {
      this.startDate = null
      this.endDate = null
      this.filters = {
        alertCategory: null,
        alertSeverity: null
      }
      this.$store.commit('SET_ALERTS_PARAMS', {
        category: null,
        severity: null,
        hostname: null
      })
      this.alertStatus = 'NEW'
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapState(['alerts']),
    ...mapGetters(['getAlerts'])
  },
  watch: {
    alertStatus(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.applyApiParams().then(() => {
          this.apply()
          bus.$emit('alertStatus', newValue)
        })
      }
    },
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.applyApiParams().then(() => {
          this.apply()
        })
      }
    },
    endDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.applyApiParams().then(() => {
          this.apply()
        })
      }
    }
  },
  beforeDestroy() {
    this.resetFilters()
    this.filters = {
      alertCategory: null,
      alertSeverity: null,
      hostname: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
