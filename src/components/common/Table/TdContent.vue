<template>
  <td v-tooltip="options(value)">
    {{ value ? value : '-' }}
  </td>
</template>

<script>
import TableTdTooltip from '@/mixins/tableTdTooltip.js'

export default {
  mixins: [TableTdTooltip]
}
</script>

<style lang="scss" scoped></style>
