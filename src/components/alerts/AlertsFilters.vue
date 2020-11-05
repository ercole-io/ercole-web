<template>
  <DrawerFilters title="Alerts Filters">
    <form @submit.prevent="apply">
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

      <FiltersButtons />
    </form>
  </DrawerFilters>
</template>

<script>
import moment from 'moment'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import DrawerFilters from '@/components/common/DrawerFilters.vue'
import FiltersButtons from '@/components/common/Filters/FiltersButtons.vue'
import CustomField from '@/components/common/Filters/CustomField.vue'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin],
  components: {
    DrawerFilters,
    FiltersButtons,
    CustomField
  },
  data() {
    return {
      startDate: null,
      endDate: null
    }
  },
  beforeMount() {
    this.configAutocomplete()

    bus.$on('resetFilters', () => this.reset(this.resetFilters))
  },
  methods: {
    ...mapActions(['getAlertsData']),
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
    resetFilters() {
      this.startDate = null
      this.endDate = null
      this.$store.commit('SET_ALERTS_PARAMS', {
        category: null,
        severity: null,
        hostname: null
      })
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
  }
}
</script>

<style lang="scss" scoped></style>
