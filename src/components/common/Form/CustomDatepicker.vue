<template>
  <b-datepicker
    v-model="dateVal"
    size="is-small"
    :placeholder="dateMsg"
    position="is-top-right"
    icon="calendar-today"
    :max-date="setMaxDate"
    :date-formatter="formatDate"
    :date-parser="parseDate"
    class="mr-1"
    append-to-body
    :editable="true"
    v-mask="'##/##/####'"
  />
</template>

<script>
import moment from 'moment'
import formatDate from '@/filters/formatDate.js'

export default {
  name: 'commom-form-datepicker-component',
  props: {
    value: {},
    placeholder: {
      type: String,
      required: false,
    },
    maxDate: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    formatDate(date) {
      return formatDate(date)
    },
    parseDate(dateString) {
      const m = moment(dateString, 'DD/MM/YYYY', true)
      return m.isValid() ? m.toDate() : null
    },
  },
  computed: {
    dateVal: {
      get() {
        return this.value
      },
      set(val) {
        let date
        if (val instanceof Date) {
          date = val
        } else {
          const m = moment(val, 'DD/MM/YYYY', true)
          date = m.isValid() ? m.toDate() : moment(val).toDate()
        }
        this.$emit('input', isNaN(date.getTime()) ? null : date)
      },
    },
    dateMsg() {
      return this.placeholder
        ? this.placeholder
        : this.$i18n.t('common.forms.date')
    },
    setMaxDate() {
      return this.maxDate ? new Date() : null
    },
  },
}
</script>

<style lang="scss" scoped></style>
