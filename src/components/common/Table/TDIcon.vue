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
import _ from 'lodash'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  mixins: [TooltipMixin],
  computed: {
    bindIncon() {
      if (_.isArray(this.value)) {
        return this.value
      } else {
        return mapBooleanIcon(this.value)
      }
    },
    tooltip() {
      return this.options(this.bindIncon[2])
    },
    icon() {
      return this.bindIncon[0]
    },
    type() {
      return this.bindIncon[1]
    },
    size() {
      return this.bindIncon[3] ? this.bindIncon[3] : 'fa-lg'
    }
  }
}
</script>

<style lang="scss" scoped></style>
