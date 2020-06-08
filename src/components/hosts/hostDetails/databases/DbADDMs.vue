<template>
  <v-table :data="addms" :hideSortIcons="true" class="vTable-custom">
    <thead slot="head">
      <tr class="has-background-grey-lighter">
        <v-th sortKey="Action">Acion</v-th>
        <v-th sortKey="Benefit">Benefit</v-th>
        <v-th sortKey="Finding">Finding</v-th>
        <v-th sortKey="Recommendation">Recommendation</v-th>
      </tr>
    </thead>
    <tbody slot="body" slot-scope="{ displayData }">
      <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
        <td>{{ row.Action }}</td>
        <td>{{ row.Benefit }}</td>
        <td>{{ row.Finding }}</td>
        <td>{{ row.Recommendation }}</td>
      </v-tr>
    </tbody>
  </v-table>
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
