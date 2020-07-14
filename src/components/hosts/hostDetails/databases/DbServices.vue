<template>
  <section class="wrap-table">
    <v-table :data="services" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="name">Name</v-th>
          <v-th sortKey="creationDate">Creation Date</v-th>
          <v-th sortKey="enable">Enable</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.name }}</td>
          <td>{{ row.creationDate }}</td>
          <td>{{ row.enable }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
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
