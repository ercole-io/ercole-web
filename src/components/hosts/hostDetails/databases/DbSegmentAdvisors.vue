<template>
  <v-table :data="segmentAdvisors" :hideSortIcons="true" class="vTable-custom">
    <thead slot="head">
      <tr class="has-background-grey-lighter">
        <v-th sortKey="Recla">Recla</v-th>
        <v-th sortKey="Segment">Segment</v-th>
        <v-th sortKey="Segme1">Segme</v-th>
        <v-th sortKey="Segme2">Segme</v-th>
        <v-th sortKey="Partition">Partition</v-th>
        <v-th sortKey="Recommendation">Recommendation</v-th>
      </tr>
    </thead>
    <tbody slot="body" slot-scope="{ displayData }">
      <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
        <td>{{ row.Recla }}</td>
        <td>{{ row.Segment }}</td>
        <td>{{ row.Segme1 }}</td>
        <td>{{ row.Segme2 }}</td>
        <td>{{ row.Partition }}</td>
        <td>{{ row.Recommendation }}</td>
      </v-tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    segmentAdvisors: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
