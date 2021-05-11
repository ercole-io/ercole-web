<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Status">
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
    </CustomField>

    <CustomField label="Type">
      <b-select
        v-model="filters.alertCategory"
        size="is-small"
        placeholder="Select a Type"
        expanded
      >
        <option :value="null" v-if="filters.alertCategory">
          Reset
        </option>
        <option value="AGENT">AGENT</option>
        <option value="ENGINE">ENGINE</option>
        <option value="LICENSE">LICENSE</option>
      </b-select>
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
      <b-select
        v-model="filters.alertSeverity"
        size="is-small"
        placeholder="Select a Severity"
        expanded
      >
        <option :value="null" v-if="filters.alertSeverity">
          Reset
        </option>
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
        <option value="CRITICAL">CRITICAL</option>
      </b-select>
    </CustomField>

    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'hostname', getAlerts)"
      />
    </CustomField>

    <CustomField label="Code">
      <b-autocomplete
        v-model="filters.alertCode"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'alertCode', getAlerts)"
      />
    </CustomField>

    <CustomField label="Description">
      <b-autocomplete
        v-model="filters.description"
        size="is-small"
        clearable
        :data="filteredData"
        @typing="setFilteredAutocomplete($event, 'description', getAlerts)"
      />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin],
  components: {
    AdvancedFiltersBase,
    CustomField
  },
  data() {
    return {
      alertStatus: 'NEW',
      startDate: null,
      endDate: null,
      filters: {
        alertCategory: null,
        alertSeverity: null
      }
    }
  },
  beforeMount() {
    this.configAutocomplete()

    this.filters = {
      alertCategory: this.alerts.params.category,
      alertSeverity: this.alerts.params.severity,
      hostname: this.alerts.params.hostname
    }
    this.apply()

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
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
    configAutocomplete() {
      this.setAutocompleteData('hostname', this.getAlerts)
      this.setAutocompleteData('alertCode', this.getAlerts)
      this.setAutocompleteData('description', this.getAlerts)
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
