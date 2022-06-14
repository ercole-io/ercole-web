<template>
  <b-tab-item label="Pluggable DBs" v-if="pdbs.length > 0">
    <b-collapse
      v-for="(pdb, i) in pdbs"
      :key="i"
      :id="i"
      animation="slide"
      class="card mt-2 mb-4"
      :open="false"
    >
      <template #trigger="props">
        <div
          class="panel-heading card-header py-0 px-0 is-size-6"
          role="button"
          aria-controls="contentIdForA11y2"
        >
          <p class="card-header-title mb-0">
            {{ pdb.pdbName }}
          </p>
          <a class="card-header-icon py-2 px-2">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"> </b-icon>
          </a>
        </div>
      </template>
      <b-tabs size="is-small" position="is-centered" class="block mr-0 p-3">
        <b-tab-item label="Status">
          <p class="py-3">
            Status:
            <span class="has-text-weight-medium">{{ pdb.pdbStatus }}</span>
          </p>
        </b-tab-item>
        <b-tab-item
          label="Schemas"
          v-if="pdb.pdbSchemas && pdb.pdbSchemas.length > 0"
        >
          <section class="wrap-table py-3">
            <FullTable
              :tableData="pdb.pdbSchemas"
              :keys="['user', 'total', 'tables', 'indexes', 'lob']"
              hideSearch
              hidePerpage
              hidePagination
              hideTopTable
              :isLoadingTable="false"
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
        <b-tab-item
          label="Tablespaces"
          v-if="pdb.pdbTablespaces && pdb.pdbTablespaces.length > 0"
        >
          <section class="wrap-table py-3">
            <FullTable
              :tableData="pdb.pdbTablespaces"
              :keys="['name', 'status', 'usedPerc', 'used', 'total', 'maxSize']"
              hideSearch
              hidePerpage
              hidePagination
              hideTopTable
              :isLoadingTable="false"
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
        <b-tab-item
          label="Grant Role"
          v-if="pdb.pdbGrantDba && pdb.pdbGrantDba.length > 0"
        >
          <section class="wrap-table py-3">
            <FullTable
              :tableData="pdb.pdbGrantDba"
              :keys="['adminOption', 'defaultRole', 'grantee']"
              hideSearch
              hidePerpage
              hidePagination
              hideTopTable
              :isLoadingTable="false"
            >
              <template slot="headData">
                <v-th sortKey="grantee">Grantee</v-th>
                <v-th sortKey="adminOption">Admin Option</v-th>
                <v-th sortKey="defaultRole">Default Role</v-th>
              </template>

              <template slot="bodyData" slot-scope="rowData">
                <TdContent :value="rowData.scope.grantee" />
                <TdIcon :value="rowData.scope.adminOption" />
                <TdIcon :value="rowData.scope.defaultRole" />
              </template>
            </FullTable>
          </section>
        </b-tab-item>
      </b-tabs>
    </b-collapse>
  </b-tab-item>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  components: {
    FullTable,
    TdContent,
    TdIcon,
  },
  props: {
    pdbs: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
