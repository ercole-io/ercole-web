<template>
  <section class="wrap-table">
    <v-table :data="backups" :hideSortIcons="true" class="vTable-custom">
      <thead slot="head">
        <tr class="has-background-grey-lighter">
          <v-th sortKey="weekDays">Days of the Week</v-th>
          <v-th sortKey="hour">Hour</v-th>
          <v-th sortKey="backupType">Type</v-th>
          <v-th sortKey="avgBckSize">Average</v-th>
          <v-th sortKey="retention">RMAN</v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="(row, index) in displayData" :key="index" :row="row">
          <TdArray :value="row.weekDays" />
          <td>{{ row.hour }}</td>
          <td>{{ row.backupType }}</td>
          <td>{{ row.avgBckSize }}</td>
          <td>{{ row.retention }}</td>
        </v-tr>
      </tbody>
    </v-table>
  </section>
</template>

<script>
import TdArray from '@/components/common/Table/TdArray.vue'

export default {
  components: {
    TdArray
  },
  props: {
    backups: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
