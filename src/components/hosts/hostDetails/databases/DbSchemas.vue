<template>
  <section class="wrap-table">
    <v-table :data="schemas" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="User">User</v-th>
          <v-th sortKey="Total">Total</v-th>
          <v-th sortKey="Tables">Tables</v-th>
          <v-th sortKey="Indexes">Indexes</v-th>
          <v-th sortKey="LOB">LOB</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.User }}</td>
          <td>{{ row.Total }}</td>
          <td>{{ row.Tables }}</td>
          <td>{{ row.Indexes }}</td>
          <td>{{ row.LOB }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
export default {
  props: {
    schemas: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
