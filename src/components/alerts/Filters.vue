<template>
  <AdvancedFiltersBase :submitAction="applyAlertsFilters">
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

        <CustomField label="Type">
          <CustomSelect
            v-model="alertCategory"
            fixedOptions
            data-cy="alert-category"
          >
            <option value="AGENT">AGENT</option>
            <option value="ENGINE">ENGINE</option>
            <option value="LICENSE">LICENSE</option>
          </CustomSelect>
        </CustomField>

        <CustomField :label="$t('common.fields.date')">
          <b-datepicker
            v-model="dateFrom"
            size="is-small"
            placeholder="Start Date"
            position="is-bottom-right"
            icon="calendar-today"
            :max-date="dateTo ? dateTo : new Date()"
            :date-formatter="formatDate"
            class="mr-1"
            trap-focus
          />
          <b-datepicker
            v-model="dateTo"
            size="is-small"
            placeholder="End Date"
            position="is-bottom-left"
            icon="calendar-today"
            :min-date="dateFrom"
            :max-date="new Date()"
            :date-formatter="formatDate"
            class="ml-1"
            trap-focus
          />
        </CustomField>

        <CustomField :label="$t('common.fields.severity')">
          <CustomSelect
            v-model="alertSeverity"
            fixedOptions
            data-cy="alert-severity"
          >
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="CRITICAL">CRITICAL</option>
          </CustomSelect>
        </CustomField>

        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete v-model="alertHostname" />
        </CustomField>

        <CustomField :label="$t('common.fields.code')">
          <CustomSelect v-model="alertCode" fixedOptions data-cy="alert-code">
            <option value="NEW_SERVER">NEW_SERVER</option>
            <option value="UNLISTED_RUNNING_DATABASE">
              UNLISTED_RUNNING_DATABASE
            </option>
            <option value="MISSING_PRIMARY_DATABASE">
              MISSING_PRIMARY_DATABASE
            </option>
            <option value="MISSING_HOST_IN_ERCOLE">
              MISSING_HOST_IN_ERCOLE
            </option>
            <option value="MISSING_HOST_IN_CMDB">MISSING_HOST_IN_CMDB</option>
            <option value="AGENT_ERROR">AGENT_ERROR</option>
            <option value="DISMISSED_HOST">DISMISSED_HOST</option>
            <option value="NO_DATA">NO_DATA</option>
            <option value="NEW_DATABASE">NEW_DATABASE</option>
            <option value="NEW_LICENSE">NEW_LICENSE</option>
            <option value="NEW_OPTION">NEW_OPTION</option>
            <option value="INCREASED_CPU_CORES">INCREASED_CPU_CORES</option>
            <option value="MISSING_DATABASE">MISSING_DATABASE</option>
          </CustomSelect>
        </CustomField>

        <CustomField :label="$t('common.fields.description')">
          <CustomAutocomplete v-model="alertDescription" />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import formatDate from '@/filters/formatDate.js'
import Collapse from '@/components/common/Collapse.vue'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import CustomAutocomplete from '@/components/common/Form/CustomAutocomplete.vue'
import CustomSelect from '@/components/common/Form/CustomSelect.vue'

export default {
  components: {
    Collapse,
    AdvancedFiltersBase,
    CustomField,
    CustomAutocomplete,
    CustomSelect,
  },
  data() {
    return {
      collapses: ['General'],
      alertStatus: 'NEW',
      alertCategory: null,
      dateFrom: null,
      dateTo: null,
      alertSeverity: null,
      alertHostname: null,
      alertCode: null,
      alertDescription: null,
    }
  },
  mounted() {
    bus.$on('onResetAction', () => this.resetAlertsFilters())

    this.alertCategory = this.getAlertsParams.category
    this.alertSeverity = this.getAlertsParams.severity
    this.alertHostname = this.getAlertsParams.hostname
  },
  methods: {
    ...mapActions(['getAlertsData']),
    ...mapMutations(['SET_ALERTS_PARAMS', 'SET_PAGE_NUM']),
    applyAlertsFilters() {
      this.SET_PAGE_NUM(1)
      this.SET_ALERTS_PARAMS({
        status: this.alertStatus,
        category: this.alertCategory,
        from: formatDatepickerDate(this.dateFrom, 'compare'),
        to: formatDatepickerDate(this.dateTo),
        severity: this.alertSeverity,
        hostname: this.alertHostname,
        code: this.alertCode,
        description: this.alertDescription,
      })
      this.getAlertsData()
    },
    resetAlertsFilters() {
      this.SET_PAGE_NUM(1)
      this.resetFields()
      this.getAlertsData()
    },
    resetFields() {
      this.alertStatus = 'NEW'
      this.alertCategory = null
      this.dateFrom = null
      this.dateTo = null
      this.alertSeverity = null
      this.alertHostname = null
      this.alertCode = null
      this.alertDescription = null

      this.SET_ALERTS_PARAMS({
        status: 'NEW',
        category: null,
        from: null,
        to: null,
        severity: null,
        hostname: '',
        code: null,
        description: '',
      })
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  computed: {
    ...mapGetters(['getAlertsParams']),
  },
  beforeDestroy() {
    this.resetFields()
  },
}
</script>

<style lang="scss" scoped></style>
