<template>
  <BoxContent
    title="Pluggable Databases"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding: 0"
    v-if="isMounted"
  >
    <template v-if="Object.keys(getOraclePdbs).length > 0">
      <b-tabs
        size="is-small"
        type="is-toggle"
        destroy-on-hide
        vertical
        animated
      >
        <b-tab-item
          v-for="(host, key) in getOraclePdbs"
          :label="key"
          :key="key"
        >
          <b-collapse
            v-for="(pdb, i) in host"
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
                <p class="card-header-title mb-0" v-html="pdb.pdb.name" />
                <a class="card-header-icon py-2 px-2">
                  <b-icon :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>
            </template>
            <b-tabs
              size="is-small"
              position="is-centered"
              class="block mr-0 p-3"
            >
              <b-tab-item label="General">
                <p class="mb-0 mt-2 is-size-7">
                  Status:
                  <span
                    class="has-text-weight-medium"
                    v-html="pdb.pdb.status"
                  />
                </p>
                <p class="mb-0 is-size-7">
                  Allocable:
                  <span
                    class="has-text-weight-medium"
                    v-html="pdb.pdb.allocable"
                  />
                </p>
                <p class="mb-0 is-size-7">
                  DatafileSize:
                  <span
                    class="has-text-weight-medium"
                    v-html="pdb.pdb.datafileSize"
                  />
                </p>
                <p class="mb-0 is-size-7">
                  SegmentsSize:
                  <span
                    class="has-text-weight-medium"
                    v-html="pdb.pdb.segmentsSize"
                  />
                </p>
              </b-tab-item>
              <b-tab-item
                label="Schemas"
                v-if="pdb.pdb.schemas && pdb.pdb.schemas.length > 0"
              >
                <section class="wrap-table py-3">
                  <FullTable
                    :tableData="pdb.pdb.schemas"
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
                v-if="pdb.pdb.tablespaces && pdb.pdb.tablespaces.length > 0"
              >
                <section class="wrap-table py-3">
                  <FullTable
                    :tableData="pdb.pdb.tablespaces"
                    :keys="[
                      'name',
                      'status',
                      'usedPerc',
                      'used',
                      'total',
                      'maxSize',
                    ]"
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
                v-if="pdb.pdb.grantDba && pdb.pdb.grantDba.length > 0"
              >
                <section class="wrap-table py-3">
                  <FullTable
                    :tableData="pdb.pdb.grantDba"
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
      </b-tabs>
    </template>
    <NoContent v-else style="height: 500px" />
  </BoxContent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  components: {
    BoxContent,
    FullTable,
    TdContent,
    TdIcon,
    NoContent,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getPdbs().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['getPdbs']),
  },
  computed: {
    ...mapGetters(['getOraclePdbs', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>