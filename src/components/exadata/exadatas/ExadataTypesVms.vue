<template>
  <b-table :data="data">
    <b-table-column field="hostname" label="Hostname" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.hostname)"
          v-html="highlight(props.row.hostname || props.row.name)"
        />
      </template>
    </b-table-column>

    <b-table-column field="ram" label="Ram" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.ramCurrent)"
          v-html="highlight(props.row.ramCurrent)"
        />
      </template>
    </b-table-column>

    <b-table-column field="vcpu" label="VCPU" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.cpuCurrent)"
          v-html="highlight(props.row.cpuCurrent)"
        />
      </template>
    </b-table-column>
  </b-table>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped></style>
