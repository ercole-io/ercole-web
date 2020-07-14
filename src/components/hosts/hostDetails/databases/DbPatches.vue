<template>
  <section class="wrap-table">
    <v-table :data="patches" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="action">Action</v-th>
          <v-th sortKey="version">Version</v-th>
          <v-th sortKey="description">Description</v-th>
          <v-th sortKey="patchID">Patch</v-th>
          <v-th sortKey="date">Date</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <td>{{ row.action }}</td>
          <td>{{ row.version }}</td>
          <td>{{ row.description }}</td>
          <td>{{ row.patchID }}</td>
          <td>{{ row.date | formatDate }}</td>
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
