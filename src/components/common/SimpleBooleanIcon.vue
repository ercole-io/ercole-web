<template>
  <span v-tooltip.right="options(bindIncon(value)[2])">
    <b-icon
      size="is-small"
      :icon="bindIncon(value)[0]"
      :type="bindIncon(value)[1]"
      style="vertical-align: middle"
    >
    </b-icon>
  </span>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  name: 'commom-simplebooleanicon-component',
  mixins: [TooltipMixin],
  props: ['value'],
  methods: {
    bindIncon(value) {
      return mapBooleanIcon(value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
