<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.status')">
          <CustomSelect v-model="alertStatus" :hasReset="false" fixedOptions>
            <option value="NEW">NEW</option>
            <option value="ACK">ACK</option>
            <option value="DISMISSED">DISMISSED</option>
            <option value="">All</option>
          </CustomSelect>
        </CustomField>

        <CustomField :label="$t('common.fields.type')">
          <CustomSelect v-model="filters.alertCategory" fixedOptions>
            <option value="AGENT">AGENT</option>
            <option value="ENGINE">ENGINE</option>
            <option value="LICENSE">LICENSE</option>
          </CustomSelect>
        </CustomField>

        <CustomField :label="$t('common.fields.date')">
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

        <CustomField :label="$t('common.fields.severity')">
          <CustomSelect v-model="filters.alertSeverity" fixedOptions>
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="CRITICAL">CRITICAL</option>
          </CustomSelect>
        </CustomField>

        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.code')">
          <CustomSelect
            v-model="filters.alertCode"
            :options="filteredalertCode"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.description')">
          <CustomAutocomplete
            v-model="filters.description"
            :filterResult="filtereddescription"
            :filterMethod="setAutocompletes"
          />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import formatDate from '@/filters/formatDate.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['hostname', 'alertCode', 'description'],
      selects: ['alertCode'],
      alertStatus: 'NEW',
      startDate: null,
      endDate: null,
      filters: {
        alertCategory: null,
        alertSeverity: null,
      },
    }
  },
  created() {
    this.fullData = this.getAlerts

    this.filters = {
      alertCategory: this.alerts.params.category,
      alertSeverity: this.alerts.params.severity,
      hostname: this.alerts.params.hostname,
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
          endDate: formatDatepickerDate(this.endDate),
        }).then(
          (res) => {
            resolve(res)
          },
          (err) => reject(err)
        )
      })
    },
    resetFilters() {
      this.startDate = null
      this.endDate = null
      this.filters = {
        alertCategory: null,
        alertSeverity: null,
      }
      this.$store.commit('SET_ALERTS_PARAMS', {
        category: null,
        severity: null,
        hostname: null,
      })
      this.alertStatus = 'NEW'
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  computed: {
    ...mapState(['alerts']),
    ...mapGetters(['getAlerts']),
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
    },
  },
  beforeDestroy() {
    this.resetFilters()
    this.filters = {
      alertCategory: null,
      alertSeverity: null,
      hostname: null,
    }
  },
}
</script>

<style lang="scss" scoped></style>
