<template>
  <section class="wrap-table">
    <v-table
      :data="segmentAdvisors"
      :hideSortIcons="true"
      class="vTable-custom"
    >
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="Reclaimable">Reclaimable</v-th>
          <v-th sortKey="SegmentName">Segment Name</v-th>
          <v-th sortKey="SegmentOwner">Segment Owner</v-th>
          <v-th sortKey="SegmentType">Segment Type</v-th>
          <v-th sortKey="PartitionName">Partition</v-th>
          <v-th sortKey="Recommendation">Recommendation</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.Reclaimable }}</td>
          <td>{{ row.SegmentName }}</td>
          <td>{{ row.SegmentOwner }}</td>
          <td>{{ row.SegmentType }}</td>
          <td>{{ row.PartitionName }}</td>
          <td>{{ row.Recommendation }}</td>
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
