<template>
  <section class="wrap-table">
    <v-table :data="tablespaces" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="name">Name</v-th>
          <v-th sortKey="status">Status</v-th>
          <v-th sortKey="used">Used</v-th>
          <v-th sortKey="usedPerc">Used GB</v-th>
          <v-th sortKey="total">Total</v-th>
          <v-th sortKey="maxSize">Max Size</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.name }}</td>
          <td>{{ row.status }}</td>
          <td>{{ row.used }}</td>
          <td>{{ row.usedPerc }}</td>
          <td>{{ row.total }}</td>
          <td>{{ row.maxSize }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
export default {
  props: {
    tablespaces: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
