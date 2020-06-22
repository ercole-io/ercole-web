<template>
  <section class="wrap-table">
    <v-table :data="patches" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="Action">Action</v-th>
          <v-th sortKey="Version">Version</v-th>
          <v-th sortKey="Description">Description</v-th>
          <v-th sortKey="PatchID">Patch</v-th>
          <v-th sortKey="Date">Date</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.Action }}</td>
          <td>{{ row.Version }}</td>
          <td>{{ row.Description }}</td>
          <td>{{ row.PatchID }}</td>
          <td>{{ row.Date | formatDate }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
export default {
  props: {
    patches: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
