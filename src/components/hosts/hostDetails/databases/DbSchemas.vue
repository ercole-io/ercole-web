<template>
  <section class="wrap-table">
    <v-table :data="schemas" :hideSortIcons="true" class="vTable-custom">
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
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.user }}</td>
          <td>{{ row.total }}</td>
          <td>{{ row.tables }}</td>
          <td>{{ row.indexes }}</td>
          <td>{{ row.lob }}</td>
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
