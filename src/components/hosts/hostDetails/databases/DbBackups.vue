<template>
  <v-table :data="backups" :hideSortIcons="true" class="vTable-custom">
    <thead slot="head">
      <tr class="has-background-grey-lighter">
        <v-th sortKey="Daysweek">Days of the Week</v-th>
        <v-th sortKey="Hour">Hour</v-th>
        <v-th sortKey="Type">Type</v-th>
        <v-th sortKey="Average">Average</v-th>
        <v-th sortKey="RMAN">RMAN</v-th>
      </tr>
    </thead>
    <tbody slot="body" slot-scope="{ displayData }">
      <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
        <td>{{ row.Daysweek }}</td>
        <td>{{ row.Hour }}</td>
        <td>{{ row.Type }}</td>
        <td>{{ row.Average }}</td>
        <td>{{ row.RMAN }}</td>
      </v-tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    backups: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
