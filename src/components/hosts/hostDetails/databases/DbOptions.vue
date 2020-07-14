<template>
  <section class="wrap-table">
    <v-table :data="options" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="last">Last</v-th>
          <v-th sortKey="detected">Detected</v-th>
          <v-th sortKey="prod">Prod</v-th>
          <v-th sortKey="currently">Currently</v-th>
          <v-th sortKey="extra">Extra</v-th>
          <v-th sortKey="feature">Feature</v-th>
          <v-th sortKey="first">First</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.last }}</td>
          <td>{{ row.detected }}</td>
          <td>{{ row.prod }}</td>
          <td>{{ row.currently }}</td>
          <td>{{ row.extra }}</td>
          <td>{{ row.feature }}</td>
          <td>{{ row.first }}</td>
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
