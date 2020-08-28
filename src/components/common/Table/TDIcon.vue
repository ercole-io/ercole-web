<template>
  <td v-tooltip="tooltip">
    <b-icon
      :custom-size="size"
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
      return this.options(this.value[2])
    },
    icon() {
      return this.value[0]
    },
    type() {
      return this.value[1]
    },
    size() {
      return this.value[3] ? this.value[3] : 'fa-lg'
    }
  }
}
</script>

<style lang="scss" scoped></style>
