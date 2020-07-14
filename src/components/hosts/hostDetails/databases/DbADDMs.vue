<template>
  <section class="wrap-table">
    <v-table :data="addms" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="action">Acion</v-th>
          <v-th sortKey="benefit">Benefit</v-th>
          <v-th sortKey="finding">Finding</v-th>
          <v-th sortKey="recommendation">Recommendation</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.action }}</td>
          <td>{{ row.benefit }}</td>
          <td>{{ row.finding }}</td>
          <td>{{ row.recommendation }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
export default {
  props: {
    addms: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
