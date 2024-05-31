<template>
  <b-datepicker
    v-model="dateVal"
    size="is-small"
    :placeholder="dateMsg"
    position="is-top-right"
    icon="calendar-today"
    :max-date="setMaxDate"
    :date-formatter="formatDate"
    class="mr-1"
    append-to-body
  />
</template>

<script>
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
  },
  computed: {
    dateVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
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
