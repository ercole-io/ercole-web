<template>
  <section class="columns mb-0">
    <div class="column is-4">
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
    <div class="column is-4">
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

    <div class="column is-4">
      <span class="is-size-7 has-text-weight-semibold ml-2">Storage Usage</span>
      <ProgressBar
        :progressMaxValue="exadataProgress.totalSize.quantity"
        :progressValue="exadataProgress.usedSize.quantity"
        :progressTooltip="
          setTooltip(
            formatValue(exadataProgress.totalSize.unparsedValue),
            formatValue(exadataProgress.usedSize.unparsedValue),
            formatValue(exadataProgress.freeSpace.unparsedValue),
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
    formatValue(val) {
      const ext = val.substr(val.length - 2)
      let values
      let value

      if (_.includes(val, '.')) {
        values = val.split('.')
        value = values[1].slice(0, 2)
        return `${values[0]}.${value} ${ext}`
      } else {
        values = val.slice(0, -2)
        return values == 0 ? values : `${values} ${ext}`
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
