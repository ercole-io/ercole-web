<template>
  <section class="columns mb-0">
    <div class="column is-4">
      <span class="is-size-7 has-text-weight-semibold ml-2">VCPU Usage</span>
      <ProgressBar
        :progressValue="formatPercentage(exadataProgress.usedCPUPercentage)"
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
    <div class="column is-4">
      <span class="is-size-7 has-text-weight-semibold ml-2">Ram Usage</span>
      <ProgressBar
        :progressValue="formatPercentage(exadataProgress.usedMemoryPercentage)"
        :progressTooltip="
          setTooltip(
            exadataProgress.totalMemory,
            exadataProgress.usedMemory,
            exadataProgress.freeMemory,
            ''
          )
        "
        v-if="exadataType !== 'BARE METAL'"
      />
      <p class="is-size-7 has-text-centered" v-else>
        {{ exadataProgress.totalMemory }}
      </p>
    </div>

    <div class="column is-4">
      <span class="is-size-7 has-text-weight-semibold ml-2">Storage Usage</span>
      <ProgressBar
        :progressValue="formatPercentage(exadataProgress.usedSizePercentage)"
        :progressTooltip="
          setTooltip(
            exadataProgress.totalSize,
            exadataProgress.usedSize,
            exadataProgress.freeSpace,
            ''
          )
        "
      />
    </div>
  </section>
</template>

<script>
import ProgressMixin from '@/mixins/exadata/progress-mixin.js'
import _ from 'lodash'
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
  methods: {
    formatPercentage(val) {
      return _.toNumber(val.split('%')[0])
    },
  },
}
</script>

<style lang="scss" scoped></style>
