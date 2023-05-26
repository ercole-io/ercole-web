<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-6">
        Grid Disks Info:
        <span class="has-text-weight-bold is-size-5">{{ hostname }}</span>
      </p>
    </header>
    <section class="modal-card-body">
      <b-table :data="data">
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

        <b-table-column field="size" label="Size" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.size || '-')"
              v-html="highlight(props.row.size || '-')"
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

        <b-table-column field="gridDisk" label="Grid Disk" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.gridDisk || '-')"
              v-html="highlight(props.row.gridDisk || '-')"
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

        <b-table-column
          field="errorCount"
          label="Error Count"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.errorCount || '-')"
              v-html="highlight(props.row.errorCount || '-')"
            />
          </template>
        </b-table-column>

        <b-table-column
          field="cachingPolicy"
          label="Caching Policy"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.cachingPolicy || '-')"
              v-html="highlight(props.row.cachingPolicy || '-')"
            />
          </template>
        </b-table-column>

        <b-table-column
          field="asmDiskName"
          label="Asm Disk Name"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.asmDiskName || '-')"
              v-html="highlight(props.row.asmDiskName || '-')"
            />
          </template>
        </b-table-column>

        <b-table-column
          field="asmDiskGroup"
          label="Asm Disk Group"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.asmDiskGroup || '-')"
              v-html="highlight(props.row.asmDiskGroup || '-')"
            />
          </template>
        </b-table-column>

        <b-table-column
          field="asmDiskSize"
          label="Asm Disk Size"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.asmDiskSize || '-')"
              v-html="highlight(props.row.asmDiskSize || '-')"
            />
          </template>
        </b-table-column>

        <b-table-column
          field="asmDiskStatus"
          label="Asm Disk Status"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.asmDiskStatus || '-')"
              v-html="highlight(props.row.asmDiskStatus || '-')"
            />
          </template>
        </b-table-column>
      </b-table>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    data: {
      type: Array,
      default: () => {},
    },
    hostname: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-card-title {
  font-size: 1.2rem;
}

.modal-card-body {
  font-size: 1rem;
  cursor: default;
}
</style>
