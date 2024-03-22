<template>
  <b-progress
    :precision="progressPrecision"
    :format="progressFormat"
    :type="progressColor"
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
  computed: {
    progressColor() {
      const progress = this.progressValue
      if (progress >= 0 && progress <= 70) {
        return 'is-alt-success'
      }
      if (progress > 70 && progress <= 80) {
        return 'is-alt-warning'
      }
      if (progress > 80 && progress <= 90) {
        return 'is-alt-orange'
      }
      return 'is-alt-danger'
    },
  },
}
</script>

<style lang="scss" scoped></style>
