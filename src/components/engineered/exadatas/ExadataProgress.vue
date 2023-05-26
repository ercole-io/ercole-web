<template>
  <section class="columns mb-0">
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">Ram Usage</span>
      <b-progress
        format="percent"
        type="is-warning"
        :value="exadataProgress.usedMemory"
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(
              exadataProgress.totalMemory,
              exadataProgress.freeMemory,
              'GB'
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
        :value="exadataProgress.usedCPU"
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(exadataProgress.totalCPU, exadataProgress.freeCPU, 'GB')
          )
        "
      />
    </div>
  </section>
</template>

<script>
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
    setTooltip(total, free, format) {
      return `Total: ${total}${format}<br>Free: ${free}${format}`
    },
    calcValues(total, free) {
      return (total - free) * 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
