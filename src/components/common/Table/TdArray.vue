<template>
  <td v-tooltip="options(formatArrayToShow(value))">
    {{ formatArrayToShow(value) }}
  </td>
</template>

<script>
import TableTdTooltip from '@/mixins/tableTdTooltip.js'

export default {
  mixins: [TableTdTooltip],
  methods: {
    formatArrayToShow(val) {
      return val.toString().replace(/,\s*/g, '\n')
    }
  }
}
</script>

<style lang="scss" scoped></style>
