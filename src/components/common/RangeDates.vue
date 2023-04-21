<template>
  <div class="range-dates">
    <b-datepicker
      v-model="startDate"
      size="is-small"
      placeholder="Start Date"
      position="is-bottom-right"
      icon="calendar-today"
      :max-date="endDate ? endDate : new Date()"
      :date-formatter="formatDate"
      class="mr-1 range-dates-field"
      trap-focus
      @input="setRange([startDate, endDate])"
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
      class="ml-1 range-dates-field"
      trap-focus
      @input="setRange([startDate, endDate])"
    />
    <b-button
      class="ml-1"
      size="is-small"
      type="is-ercole-blue"
      icon-right="delete"
      @click="getCurrentMonthDates"
    />
  </div>
</template>

<script>
import moment from 'moment'
import formatDate from '@/filters/formatDate.js'

export default {
  name: 'commom-rangedates-component',
  props: {
    setRange: {
      type: Function,
      default: () => {},
    },
    totalRange: {
      type: String,
      default: '31',
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
    }
  },
  beforeMount() {
    this.getCurrentMonthDates()
  },
  methods: {
    getCurrentMonthDates() {
      const today = moment(new Date(), 'YYYY/MM/DD')
      if (this.totalRange) {
        this.startDate = new Date(
          moment().subtract(this.totalRange, 'days').format('YYYY-MM-DD')
        )
      } else {
        this.startDate = new Date(moment().format('YYYY-MM-01'))
      }
      this.endDate = new Date(moment().format(`YYYY-MM-${today.format('DD')}`))

      const dateRange = [this.startDate, this.endDate]
      this.setRange(dateRange)
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  beforeDestroy() {
    this.getCurrentMonthDates()
  },
}
</script>

<style lang="scss" scoped>
.range-dates {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;

  .range-dates-field {
    width: 100%;
    max-width: 150px;
  }
}
</style>
