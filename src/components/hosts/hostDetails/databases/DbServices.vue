<template>
  <v-table :data="services" :hideSortIcons="true" class="vTable-custom">
    <thead slot="head">
      <tr class="has-background-grey-lighter">
        <v-th sortKey="Name">Name</v-th>
        <v-th sortKey="CreationDate">Creation Date</v-th>
        <v-th sortKey="Enable">Enable</v-th>
      </tr>
    </thead>
    <tbody slot="body" slot-scope="{ displayData }">
      <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
        <td>{{ row.Name }}</td>
        <td>{{ row.CreationDate }}</td>
        <td>{{ row.Enable }}</td>
      </v-tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      default: Array
    }
  }
}
</script>

<style lang="scss" scoped></style>
