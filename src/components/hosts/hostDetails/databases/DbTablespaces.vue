<template>
  <v-table :data="tablespaces" :hideSortIcons="true" class="vTable-custom">
    <thead slot="head">
      <tr class="has-background-grey-lighter">
        <v-th sortKey="Name">Name</v-th>
        <v-th sortKey="Status">Status</v-th>
        <v-th sortKey="Used">Used</v-th>
        <v-th sortKey="UsedPerc">Used GB</v-th>
        <v-th sortKey="Total">Total</v-th>
        <v-th sortKey="MaxSize">Max Size</v-th>
      </tr>
    </thead>
    <tbody slot="body" slot-scope="{ displayData }">
      <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
        <td>{{ row.Name }}</td>
        <td>{{ row.Status }}</td>
        <td>{{ row.Used }}</td>
        <td>{{ row.UsedPerc }}</td>
        <td>{{ row.Total }}</td>
        <td>{{ row.MaxSize }}</td>
      </v-tr>
    </tbody>
  </v-table>
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
