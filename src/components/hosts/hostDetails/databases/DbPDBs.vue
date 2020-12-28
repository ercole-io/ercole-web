<template>
  <section>
    <Collapse
      v-for="pdb in pdbs"
      :key="pdb.name"
      :title="pdb.name"
      :id="pdb.name"
      class="mt-2"
    >
      <b-tabs size="is-small" position="is-centered" class="block">
        <b-tab-item label="Status">
          <p class="py-3">
            Status: <span class="has-text-weight-medium">{{ pdb.status }}</span>
          </p>
        </b-tab-item>
        <b-tab-item label="Services" v-if="pdb.services > 0">
          <section class="wrap-table py-3">
            <FullTable
              :tableData="pdb.services"
              :keys="[]"
              hideSearch
              hidePerpage
              hidePagination
              hideTopTable
            >
              <!-- <template slot="headData">
                
              </template>

              <template slot="bodyData" slot-scope="rowData">
                
              </template> -->
            </FullTable>
          </section>
        </b-tab-item>
        <b-tab-item label="Schemas" v-if="pdb.schemas > 0">
          <section class="wrap-table py-3">
            <FullTable
              :tableData="pdb.schemas"
              :keys="[]"
              hideSearch
              hidePerpage
              hidePagination
              hideTopTable
            >
              <template slot="headData">
                <v-th sortKey="user">User</v-th>
                <v-th sortKey="total">Total</v-th>
                <v-th sortKey="tables">Tables</v-th>
                <v-th sortKey="indexes">Indexes</v-th>
                <v-th sortKey="lob">LOB</v-th>
              </template>

              <template slot="bodyData" slot-scope="rowData">
                <TdContent :value="rowData.scope.user" />
                <TdContent :value="rowData.scope.total" />
                <TdContent :value="rowData.scope.tables" />
                <TdContent :value="rowData.scope.indexes" />
                <TdContent :value="rowData.scope.lob" />
              </template>
            </FullTable>
          </section>
        </b-tab-item>
        <b-tab-item label="Tablespaces" v-if="pdb.tablespaces > 0">
          <section class="wrap-table py-3">
            <FullTable
              :tableData="pdb.tablespaces"
              :keys="[]"
              hideSearch
              hidePerpage
              hidePagination
              hideTopTable
            >
              <template slot="headData">
                <v-th sortKey="name">Name</v-th>
                <v-th sortKey="status">Status</v-th>
                <v-th sortKey="usedPerc">Used</v-th>
                <v-th sortKey="used">Used GB</v-th>
                <v-th sortKey="total">Total</v-th>
                <v-th sortKey="maxSize">Max Size</v-th>
              </template>

              <template slot="bodyData" slot-scope="rowData">
                <TdContent :value="rowData.scope.name" />
                <TdContent :value="rowData.scope.status" />
                <TdContent :value="rowData.scope.usedPerc" />
                <TdContent :value="rowData.scope.used" />
                <TdContent :value="rowData.scope.total" />
                <TdContent :value="rowData.scope.maxSize" />
              </template>
            </FullTable>
          </section>
        </b-tab-item>
      </b-tabs>
    </Collapse>
  </section>
</template>

<script>
import Collapse from '@/components/common/Collapse.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  components: {
    Collapse,
    FullTable,
    TdContent
  },
  props: {
    pdbs: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
