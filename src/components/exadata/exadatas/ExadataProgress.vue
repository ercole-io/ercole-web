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
import _ from 'lodash'
import ProgressBar from '@/components/common/charts/ProgressBar.vue'

export default {
  name: 'exadata-progress',
  props: {
    exadataProgress: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ProgressBar,
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
