<template>
  <section class="columns mb-0">
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">Ram Usage</span>
      <ProgressBar
        :progressMaxValue="exadataProgress.totalMemory"
        :progressValue="exadataProgress.usedMemory"
        :progressTooltip="
          setTooltip(
            exadataProgress.totalMemory,
            exadataProgress.usedMemory,
            exadataProgress.freeMemory,
            ' GB'
          )
        "
        v-if="exadataType !== 'BARE METAL'"
      />
      <p class="is-size-7 has-text-centered" v-else>
        {{ exadataProgress.totalMemory }} GB
      </p>
    </div>
    <div class="column is-6">
      <span class="is-size-7 has-text-weight-semibold ml-2">VCPU Usage</span>
      <ProgressBar
        :progressMaxValue="exadataProgress.totalCPU"
        :progressValue="exadataProgress.usedCPU"
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
    exadataType: {
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped></style>
