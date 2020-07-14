<template>
  <section class="wrap-table">
    <v-table :data="backups" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="daysweek">Days of the Week</v-th>
          <v-th sortKey="hour">Hour</v-th>
          <v-th sortKey="type">Type</v-th>
          <v-th sortKey="average">Average</v-th>
          <v-th sortKey="rman">RMAN</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.daysweek }}</td>
          <td>{{ row.hour }}</td>
          <td>{{ row.type }}</td>
          <td>{{ row.average }}</td>
          <td>{{ row.rman }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
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
