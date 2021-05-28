<template>
  <b-datepicker
    v-model="dateVal"
    size="is-small"
    :placeholder="placeholder"
    position="is-bottom-right"
    icon="calendar-today"
    :max-date="new Date()"
    :date-formatter="formatDate"
    class="mr-1"
  />
</template>

<script>
import formatDate from '@/filters/formatDate.js'

export default {
  props: {
    value: {},
    placeholder: {
      type: String,
      default: 'Set a Date'
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    dateVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
