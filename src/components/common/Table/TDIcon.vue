<template>
  <td v-tooltip.bottom="tooltip">
    <b-icon
      :custom-size="size"
      :icon="icon"
      :type="type"
      style="vertical-align: middle;"
    />
  </td>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [TooltipMixin],
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
