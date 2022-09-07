<template>
  <section class="columns mb-0">
    <div class="column is-6">
      <b-progress
        format="percent"
        type="is-warning"
        :value="
          calcValues(exadataProgress.totalRam, exadataProgress.totalFreeRam)
        "
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(
              exadataProgress.totalRam,
              exadataProgress.totalFreeRam,
              'GB'
            )
          )
        "
      />
    </div>
    <div class="column is-6">
      <b-progress
        format="percent"
        type="is-warning"
        :value="
          calcValues(exadataProgress.totalVCPU, exadataProgress.totalFreeVCPU)
        "
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(
              exadataProgress.totalVCPU,
              exadataProgress.totalFreeVCPU,
              'GB'
            )
          )
        "
      />
    </div>
  </section>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [tooltipMixin],
  props: {
    exadataProgress: {
      type: Object,
      default: () => [],
    },
  },
  methods: {
    setTooltip(total, free, format) {
      return `Total: ${total}${format}<br>Free: ${free}${format}`
    },
    calcValues(total, free) {
      return (free / total) * 100
    },
  },
}
</script>

<style lang="scss" scoped></style>
