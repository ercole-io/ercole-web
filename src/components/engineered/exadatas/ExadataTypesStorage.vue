<template>
  <b-table :data="data" scrollable>
    <b-table-column field="hostname" label="Hostname" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.hostname || '-')"
          v-html="highlight(props.row.hostname || '-')"
        />
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
          v-tooltip.bottom="options(props.row.size || '-')"
          v-html="highlight(props.row.size || '-')"
        />
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
          @click.native="
            openModal(
              { hostname: props.row.hostname, data: props.row.database },
              'database'
            )
          "
          v-if="props.row.database && Object.keys(props.row.database).length"
        />
        <span v-else>-</span>
      </template>
    </b-table-column>

    <b-table-column field="freeSpace" label="Free Space" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.freeSpace || '-')"
          v-html="highlight(props.row.freeSpace || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="errorCount" label="Error Count" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.errorCount || '-')"
          v-html="highlight(props.row.errorCount || '-')"
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

    <b-table-column field="cellDisk" label="Cell Disk" centered sortable>
      <template v-slot="props">
        <p
          v-tooltip.bottom="options(props.row.cellDisk || '-')"
          v-html="highlight(props.row.cellDisk || '-')"
        />
      </template>
    </b-table-column>

    <b-table-column field="gridDisks" label="Grid Disks" centered sortable>
      <template v-slot="props">
        <b-icon
          v-tooltip="options('Grid Disks')"
          type="is-custom-primary"
          class="hosts-icon is-clickable"
          pack="fas"
          icon="hard-drive"
          @click.native="
            openModal(
              { hostname: props.row.hostname, data: props.row.gridDisks },
              'gridDisks'
            )
          "
          v-if="props.row.gridDisks && props.row.gridDisks.length > 0"
        />
        <span v-else>-</span>
      </template>
    </b-table-column>
  </b-table>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import StorageDatabaseModal from '@/components/engineered/exadatas/StorageDatabaseModal.vue'
import StorageGridDisksModal from '@/components/engineered/exadatas/StorageGridDisksModal.vue'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    openModal(data, comp) {
      this.$buefy.modal.open({
        component:
          comp === 'database' ? StorageDatabaseModal : StorageGridDisksModal,
        hasModalCard: true,
        props: {
          hostname: data.hostname,
          data: data.data,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
