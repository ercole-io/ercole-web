<template>
  <b-table :data="data" class="custom-collapse-table">
    <b-table-column field="hostname" label="Hostname" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.hostname)"
          v-html="highlight(props.row.hostname || props.row.name)"
        />
      </template>
    </b-table-column>

    <template v-if="type === 'DOM0'">
      <b-table-column field="cpuOnline" label="VCPU" centered sortable>
        <template v-slot="props">
          <p
            v-tooltip.bottom="options(props.row.cpuOnline)"
            v-html="highlight(props.row.cpuOnline)"
          />
        </template>
      </b-table-column>

      <b-table-column field="ramOnline" label="Ram" centered sortable>
        <template v-slot="props">
          <p
            v-tooltip.bottom="options(props.row.ramOnline)"
            v-html="highlight(props.row.ramOnline)"
          />
        </template>
      </b-table-column>
    </template>

    <template v-if="type === 'KVM'">
      <b-table-column field="cpuCurrent" label="VCPU" centered sortable>
        <template v-slot="props">
          <p
            v-tooltip.bottom="options(props.row.cpuCurrent)"
            v-html="highlight(props.row.cpuCurrent)"
          />
        </template>
      </b-table-column>

      <b-table-column field="ramCurrent" label="Ram" centered sortable>
        <template v-slot="props">
          <p
            v-tooltip.bottom="options(props.row.ramCurrent)"
            v-html="highlight(props.row.ramCurrent)"
          />
        </template>
      </b-table-column>

      <b-table-column centered label="Cluster Name">
        <template v-slot="props">
          <ExadataVmsUpdate
            :cluster="{
              rackID: rackID,
              hostID: hostID,
              hostname: props.row.name,
              clusterName: props.row.clusterName,
            }"
          />
        </template>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import ExadataVmsUpdate from './ExadataVmsUpdate.vue'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: '',
    },
    rackID: {
      type: String,
    },
    hostID: {
      type: String,
    },
  },
  methods: {
    setPrettyBystes(val) {
      const value = val * 1000000
      return this.$options.filters.prettyBytes(value, 2, false, 'GB')
    },
  },
  components: { ExadataVmsUpdate },
}
</script>

<style lang="scss"></style>
