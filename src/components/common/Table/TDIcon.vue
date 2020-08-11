<template>
  <td v-tooltip="options(value[3])">
    <b-icon
      size="is-small"
      :pack="value[1]"
      :icon="value[0]"
      :type="value[2]"
      style="vertical-align: middle;"
    />
  </td>
</template>

<script>
import TableTdTooltip from '@/mixins/tableTdTooltip.js'

export default {
  mixins: [TableTdTooltip]
}
</script>

<style lang="scss" scoped></style>
