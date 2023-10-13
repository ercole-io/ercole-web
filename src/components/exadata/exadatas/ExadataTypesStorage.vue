<template>
  <b-table :data="data" class="custom-collapse-table" scrollable>
    <b-table-column field="gridDisks" label="Grid Disks" centered sortable>
      <template v-slot="props">
        <b-icon
          v-tooltip="options('Grid Disks')"
          type="is-custom-primary"
          class="hosts-icon is-clickable"
          pack="fas"
          icon="hard-drive"
          @click.native="openModalGridDisks(props.row.gridDisks)"
          v-if="props.row.gridDisks && props.row.gridDisks.length > 0"
        />
        <span v-else>-</span>
      </template>
    </b-table-column>

    <b-table-column field="database" label="Database" centered sortable>
      <template v-slot="props">
        <b-icon
          v-tooltip="options('Database')"
          type="is-custom-primary"
          class="hosts-icon is-clickable"
          pack="fas"
          icon="database"
          @click.native="openModalDatabase(props.row.databases)"
          v-if="props.row.databases && props.row.databases.length > 0"
        />
        <span v-else>-</span>
      </template>
    </b-table-column>

    <b-table-column field="type" label="Type" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.type || '-')"
          v-html="highlight(props.row.type || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="cellDisk" label="Cell Disk" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.cellDisk || '-')"
          v-html="highlight(props.row.cellDisk || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="cell" label="Cell" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.cell || '-')"
          v-html="highlight(props.row.cell || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="status" label="Status" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.status || '-')"
          v-html="highlight(props.row.status || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="size" label="Size" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="
            options(formatValue(props.row.size.unparsedValue) || '-')
          "
          v-html="highlight(formatValue(props.row.size.unparsedValue) || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="freeSpace" label="Free Space" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="
            options(formatValue(props.row.freeSpace.unparsedValue) || '-')
          "
          v-html="
            highlight(formatValue(props.row.freeSpace.unparsedValue) || '-')
          "
        />
      </template>
    </b-table-column>

    <b-table-column
      field="freeSpacePerc"
      label="Free Space %"
      centered
      sortable
    >
      <template v-slot="props">
        <ProgressBar
          :progressValue="props.row.freeSizePercentage"
          :progressTooltip="`${props.row.freeSizePercentage}%`"
        />
      </template>
    </b-table-column>

    <b-table-column field="errorCount" label="Error Count" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.errorCount || '0')"
          v-html="highlight(props.row.errorCount || '0')"
        />
      </template>
    </b-table-column>
  </b-table>
</template>

<script>
import _ from 'lodash'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import ProgressMixin from '@/mixins/exadata/progress-mixin.js'
import StorageDatabaseModal from '@/components/exadata/exadatas/StorageDatabaseModal.vue'
import StorageGridDisksModal from '@/components/exadata/exadatas/StorageGridDisksModal.vue'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin, ProgressMixin],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    openModalGridDisks(data) {
      let newData = _.map(data, (d) => {
        return {
          ...d,
          size: this.formatValue(d.size),
          asmDiskSize: this.formatMBintoGB(d.asmDiskSize),
        }
      })

      this.$buefy.modal.open({
        component: StorageGridDisksModal,
        hasModalCard: true,
        props: {
          data: newData,
        },
        fullScreen: true,
      })
    },
    openModalDatabase(data) {
      this.$buefy.modal.open({
        component: StorageDatabaseModal,
        hasModalCard: true,
        props: {
          data: data,
        },
        fullScreen: true,
      })
    },
    formatValue(val) {
      const ext = val.substr(val.length - 1)
      let values
      let value

      if (_.includes(val, '.')) {
        values = val.split('.')
        value = values[1].slice(0, 2)
        return `${values[0]}.${value} ${ext}B`
      } else {
        values = val.slice(0, -1)
        return `${values} ${ext}B`
      }
    },
    formatMBintoGB(val) {
      const value = val.slice(0, -1) * 1000000
      return this.$options.filters.prettyBytes(value, 2, false, 'GB')
    },
  },
}
</script>

<style lang="scss" scoped></style>
