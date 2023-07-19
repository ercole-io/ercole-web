<template>
  <section class="columns mb-0">
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">Ram Usage</span>
      <b-progress
        format="percent"
        type="is-warning"
        :value="
          calcValues(exadataProgress.totalMemory, exadataProgress.freeMemory)
        "
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(
              exadataProgress.totalMemory,
              exadataProgress.usedMemory,
              exadataProgress.freeMemory,
              ''
            )
          )
        "
      />
    </div>
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">VCPU Usage</span>
      <b-progress
        format="percent"
        type="is-warning"
        :value="calcValues(exadataProgress.totalCPU, exadataProgress.freeCPU)"
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(
              exadataProgress.totalCPU,
              exadataProgress.usedCPU,
              exadataProgress.freeCPU,
              ''
            )
          )
        "
      />
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import tooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  name: 'exadata-progress',
  mixins: [tooltipMixin],
  props: {
    exadataProgress: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setTooltip(total, free, used, format) {
      return `Total: ${total}${format}<br>Used: ${used}${format}<br>Free: ${free}${format}`
    },
    calcValues(total, free) {
      return _.toNumber((free / total) * 100) || 0
    },
  },
}
</script>

<style lang="scss" scoped></style>
