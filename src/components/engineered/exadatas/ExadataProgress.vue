<template>
  <section class="columns mb-0">
    <div class="column is-6">
      <b-progress
        format="percent"
        type="is-warning"
        :value="calcValues(exadataProgress.totalRam, exadataProgress.freeRam)"
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(exadataProgress.totalRam, exadataProgress.freeRam, 'GB')
          )
        "
      />
    </div>
    <div class="column is-6">
      <b-progress
        format="percent"
        type="is-warning"
        :value="calcValues(exadataProgress.totalVcpu, exadataProgress.freeVcpu)"
        show-value
        v-tooltip.bottom="
          options(
            setTooltip(
              exadataProgress.totalVcpu,
              exadataProgress.freeVcpu,
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
