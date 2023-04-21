<template>
  <td v-tooltip.bottom="options(formatArrayToShow(value))">
    <span v-html="highlight(formatArrayToShow(value))"></span>
  </td>
</template>

<script>
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  name: 'commom-table-tdarray-component',
  mixins: [HighlightSearchMixin, TooltipMixin],
  methods: {
    formatArrayToShow(val) {
      return val.toString().replace(/,\s*/g, '\n') || '-'
    },
  },
}
</script>

<style lang="scss" scoped></style>
