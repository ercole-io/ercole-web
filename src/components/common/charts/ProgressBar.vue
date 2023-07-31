<template>
  <b-progress
    :format="progressFormat"
    :type="progressType"
    :value="progressValue"
    :show-value="progressShowValue"
    v-tooltip="options(progressTooltip)"
  />
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [tooltipMixin],
  props: {
    progressFormat: {
      type: String,
      default: 'percent',
    },
    progressType: {
      type: String,
      default: 'is-warning',
    },
    progressValue: {
      type: Number,
      required: true,
    },
    progressShowValue: {
      type: Boolean,
      default: true,
    },
    progressTooltip: {
      type: [String, Number],
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
