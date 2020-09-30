<template>
  <section class="wrap-table">
    <v-table :data="options" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="lastUsageDate">Last</v-th>
          <v-th sortKey="detectedUsages">Detected</v-th>
          <v-th sortKey="product">Prod</v-th>
          <v-th sortKey="currentlyUsed">Currently</v-th>
          <v-th sortKey="extraFeatureInfo">Extra</v-th>
          <v-th sortKey="feature">Feature</v-th>
          <v-th sortKey="firstUsageDate">First</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.lastUsageDate || '-' | formatDate }}</td>
          <td>{{ row.detectedUsages || '-' }}</td>
          <td>{{ row.product || '-' }}</td>
          <td>{{ row.currentlyUsed || '-' }}</td>
          <td>{{ row.extraFeatureInfo || '-' }}</td>
          <td>{{ row.feature || '-' }}</td>
          <td>{{ row.firstUsageDate || '-' | formatDate }}</td>
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
