<template>
  <td v-tooltip="tooltip">
    <b-icon
      size="is-small"
      :pack="pack"
      :icon="icon"
      :type="type"
      style="vertical-align: middle;"
    />
  </td>
</template>

<script>
import TableTdTooltip from '@/mixins/tableTdTooltip.js'

export default {
  mixins: [TableTdTooltip],
  computed: {
    tooltip() {
      return this.options(this.value[3])
    },
    pack() {
      return this.value[1]
    },
    icon() {
      return this.value[0]
    },
    type() {
      return this.value[2]
    }
  }
}
</script>

<style lang="scss" scoped></style>
