<template>
  <section class="wrap-table">
    <v-table :data="options" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="Last">Last</v-th>
          <v-th sortKey="Detected">Detected</v-th>
          <v-th sortKey="Prod">Prod</v-th>
          <v-th sortKey="Currently">Currently</v-th>
          <v-th sortKey="Extra">Extra</v-th>
          <v-th sortKey="Feature">Feature</v-th>
          <v-th sortKey="First">First</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.Last }}</td>
          <td>{{ row.Detected }}</td>
          <td>{{ row.Prod }}</td>
          <td>{{ row.Currently }}</td>
          <td>{{ row.Extra }}</td>
          <td>{{ row.Feature }}</td>
          <td>{{ row.First }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: Array
    }
  }
}
</script>

<style lang="scss" scoped></style>
