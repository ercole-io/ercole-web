<template>
  <section class="wrap-table">
    <v-table :data="psus" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="date">Date</v-th>
          <v-th sortKey="description">Description</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.date | formatDate }}</td>
          <td>{{ row.description }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
export default {
  props: {
    psus: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
