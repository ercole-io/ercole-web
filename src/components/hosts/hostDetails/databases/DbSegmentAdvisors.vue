<template>
  <section class="wrap-table">
    <v-table
      :data="segmentAdvisors"
      :hideSortIcons="true"
      class="vTable-custom"
    >
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="reclaimable">Reclaimable</v-th>
          <v-th sortKey="segmentName">Segment Name</v-th>
          <v-th sortKey="segmentOwner">Segment Owner</v-th>
          <v-th sortKey="segmentType">Segment Type</v-th>
          <v-th sortKey="partitionName">Partition</v-th>
          <v-th sortKey="recommendation">Recommendation</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.reclaimable }}</td>
          <td>{{ row.segmentName }}</td>
          <td>{{ row.segmentOwner }}</td>
          <td>{{ row.segmentType }}</td>
          <td>{{ row.partitionName }}</td>
          <td>{{ row.recommendation }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
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
