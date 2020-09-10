<template>
  <td v-tooltip="options(formatArrayToShow(value))">
    {{ formatArrayToShow(value) }}
  </td>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [TooltipMixin],
  methods: {
    formatArrayToShow(val) {
      return val.toString().replace(/,\s*/g, '\n')
    }
  }
}
</script>

<style lang="scss" scoped></style>
