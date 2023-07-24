<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-weight-semibold">
        Grid Disks Info
      </p>
    </header>
    <section class="modal-card-body">
      <SimpleTable
        :theadData="[
          'Grid Disk',
          'Cell Disk',
          'Status',
          'Size',
          'Error Count',
          'Caching Policy',
          'Asm Disk Name',
          'Asm Disk Size',
          'Asm Disk Status',
        ]"
        customStyle="max-height: 100%;"
      >
        <template slot="tbodyContent" v-if="data.length > 0">
          <tr v-for="(d, index) in data" :key="index">
            <TdContent :value="d.gridDisk" />
            <TdContent :value="d.cellDisk" />
            <TdContent :value="d.status" />
            <TdContent :value="d.size" />
            <TdContent :value="d.errorCount" />
            <TdContent :value="d.cachingPolicy" />
            <TdContent :value="d.asmDiskName" />
            <TdContent :value="d.asmDiskSize" />
            <TdContent :value="d.asmDiskStatus" />
          </tr>
        </template>
        <template slot="tbodyContent" v-else>
          <tr>
            <td colspan="2"><NoContent style="min-height: 100px" /></td>
          </tr>
        </template>
      </SimpleTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
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
  components: {
    SimpleTable,
    TdContent,
    NoContent,
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
