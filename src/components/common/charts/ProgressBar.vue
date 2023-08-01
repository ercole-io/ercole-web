<template>
  <b-progress
    :precision="progressPrecision"
    :format="progressFormat"
    :type="progressType"
    :value="forceToNumber(progressValue)"
    :max="progressMaxValue ? forceToNumber(progressMaxValue) : 100"
    :show-value="progressShowValue"
    v-tooltip="options(progressTooltip)"
  />
</template>

<script>
import _ from 'lodash'
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
    progressMaxValue: {
      type: Number,
    },
    progressPrecision: {
      type: Number,
      default: 2,
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
  methods: {
    forceToNumber(val) {
      return _.toNumber(val)
    },
  },
}
</script>

<style lang="scss" scoped></style>
