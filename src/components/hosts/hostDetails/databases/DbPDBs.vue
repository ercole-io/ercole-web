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
        <b-tab-item label="Services"></b-tab-item>
        <b-tab-item label="Schemas">
          <section class="wrap-table py-3">
            <v-table
              :data="pdb.schemas"
              :hideSortIcons="true"
              class="vTable-custom"
            >
              <thead slot="head">
                <tr class="has-background-grey-lighter">
                  <v-th sortKey="user">User</v-th>
                  <v-th sortKey="total">Total</v-th>
                  <v-th sortKey="tables">Tables</v-th>
                  <v-th sortKey="indexes">Indexes</v-th>
                  <v-th sortKey="lob">LOB</v-th>
                </tr>
              </thead>
              <tbody slot="body" slot-scope="{ displayData }">
                <v-tr
                  v-for="(row, index) in displayData"
                  :key="index"
                  :row="row"
                >
                  <td>{{ row.user }}</td>
                  <td>{{ row.total }}</td>
                  <td>{{ row.tables }}</td>
                  <td>{{ row.indexes }}</td>
                  <td>{{ row.lob }}</td>
                </v-tr>
              </tbody>
            </v-table>
          </section>
        </b-tab-item>
        <b-tab-item label="Tablespaces">
          <section class="wrap-table py-3">
            <v-table
              :data="pdb.tablespaces"
              :hideSortIcons="true"
              class="vTable-custom"
            >
              <thead slot="head">
                <tr class="has-background-grey-lighter">
                  <v-th sortKey="name">Name</v-th>
                  <v-th sortKey="status">Status</v-th>
                  <v-th sortKey="usedPerc">Used</v-th>
                  <v-th sortKey="used">Used GB</v-th>
                  <v-th sortKey="total">Total</v-th>
                  <v-th sortKey="maxSize">Max Size</v-th>
                </tr>
              </thead>
              <tbody slot="body" slot-scope="{ displayData }">
                <v-tr
                  v-for="(row, index) in displayData"
                  :key="index"
                  :row="row"
                >
                  <td>{{ row.name }}</td>
                  <td>{{ row.status }}</td>
                  <td>{{ row.usedPerc }}</td>
                  <td>{{ row.used }}</td>
                  <td>{{ row.total }}</td>
                  <td>{{ row.maxSize }}</td>
                </v-tr>
              </tbody>
            </v-table>
          </section>
        </b-tab-item>
      </b-tabs>
    </Collapse>
  </section>
</template>

<script>
import Collapse from '@/components/common/Collapse.vue'

export default {
  components: {
    Collapse
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
