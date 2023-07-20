<template>
  <section class="columns mb-0">
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">Ram Usage</span>
      <ProgressBar
        :progressValue="
          calcValues(exadataProgress.totalMemory, exadataProgress.freeMemory)
        "
        :progressTooltip="
          setTooltip(
            exadataProgress.totalMemory,
            exadataProgress.usedMemory,
            exadataProgress.freeMemory,
            ''
          )
        "
      />
    </div>
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">VCPU Usage</span>
      <ProgressBar
        :progressValue="
          calcValues(exadataProgress.totalCPU, exadataProgress.freeCPU)
        "
        :progressTooltip="
          setTooltip(
            exadataProgress.totalCPU,
            exadataProgress.usedCPU,
            exadataProgress.freeCPU,
            ''
          )
        "
      />
    </div>
  </section>
</template>

<script>
import ProgressMixin from '@/mixins/exadata/progress-mixin.js'

export default {
  mixins: [ProgressMixin],
  name: 'exadata-progress',
  props: {
    exadataProgress: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
