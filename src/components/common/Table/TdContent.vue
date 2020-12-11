<template>
  <td v-tooltip="options(value, dataType)">
    <a v-if="link" @click="link(value)">
      {{ value }}
    </a>
    <span v-if="!link">
      {{ dataType === 'date' ? formatDate(value) : value || '-' }}
    </span>
  </td>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'
import formatDateTime from '@/filters/formatDateTime.js'

export default {
  mixins: [TooltipMixin],
  props: {
    link: {
      type: Function
    },
    dataType: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatDate(date) {
      return formatDateTime(date)
    }
  }
}
</script>

<style lang="scss" scoped></style>
