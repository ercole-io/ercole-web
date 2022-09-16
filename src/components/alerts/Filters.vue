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
          <CustomAutocomplete v-model="hostname" />
        </CustomField>

        <CustomField :label="$t('common.fields.code')">
          <CustomAutocomplete v-model="alertCode" />
        </CustomField>

        <CustomField :label="$t('common.fields.description')">
          <CustomAutocomplete v-model="description" />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import { mapActions, mapMutations } from 'vuex'
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
      startDate: null,
      endDate: null,
      alertSeverity: null,
      hostname: '',
      alertCode: null,
      description: '',
    }
  },
  mounted() {
    bus.$on('onResetAction', () => this.resetAlertsFilters())
  },
  methods: {
    ...mapActions(['getAlertsData']),
    ...mapMutations(['SET_ALERTS_PARAMS']),
    applyAlertsFilters() {
      this.SET_ALERTS_PARAMS({
        status: this.alertStatus,
        alertCategory: this.alertCategory,
        from: formatDatepickerDate(this.startDate, 'compare'),
        to: formatDatepickerDate(this.endDate),
        severity: this.alertSeverity,
        hostname: this.hostname,
        alertCode: this.alertCode,
        description: this.description,
      })
      this.getAlertsData()
    },
    resetAlertsFilters() {
      this.resetFields()
      this.getAlertsData()
    },
    resetFields() {
      this.alertStatus = 'NEW'
      this.alertCategory = null
      this.startDate = null
      this.endDate = null
      this.alertSeverity = null
      this.hostname = ''
      this.alertCode = null
      this.description = ''

      this.SET_ALERTS_PARAMS({
        status: 'NEW',
        alertCategory: null,
        from: null,
        to: null,
        alertSeverity: null,
        hostname: '',
        alertCode: null,
        description: '',
      })
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  beforeDestroy() {
    this.resetFields()
  },
}
</script>

<style lang="scss" scoped></style>
