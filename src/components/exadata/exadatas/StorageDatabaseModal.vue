<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-weight-semibold">
        Databases Info
      </p>
      <button type="button" class="delete" @click="$parent.close()" />
    </header>
    <section class="modal-card-body">
      <SimpleTable
        :theadData="[
          'Database Name',
          'Cell',
          'Flash Cache Limit',
          'Iorm Share',
          'Last IO Req',
        ]"
        customStyle="max-height: 100%;"
      >
        <template slot="tbodyContent" v-if="data.length > 0">
          <tr v-for="(d, index) in data" :key="index">
            <TdContent :value="d.dbName" />
            <TdContent :value="d.cell" />
            <TdContent :value="d.flashCacheLimit" />
            <TdContent :value="d.iormShare" />
            <TdContent :value="formatDate(d.lastIOReq)" />
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
import FormatDateTime from '@/filters/formatDateTime.js'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => {},
    },
  },
  components: {
    SimpleTable,
    TdContent,
    NoContent,
  },
  methods: {
    formatDate(date) {
      return FormatDateTime(date)
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
