<template>
  <td v-tooltip.bottom="tooltip" v-if="!noTd">
    <b-icon
      :custom-size="size"
      :icon="icon"
      :type="type"
      style="vertical-align: middle"
    />
  </td>
  <b-icon
    :custom-size="size"
    :icon="icon"
    :type="type"
    style="vertical-align: middle"
    v-else
  />
</template>

<script>
import _ from 'lodash'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  name: 'commom-table-tdicon-component',
  mixins: [TooltipMixin],
  props: {
    noTd: {
      type: Boolean,
      default: false,
    },
  },
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
    },
  },
}
</script>

<style lang="scss" scoped></style>
