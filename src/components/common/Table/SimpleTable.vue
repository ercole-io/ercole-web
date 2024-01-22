<template>
  <div class="table-container" :style="customStyle">
    <table class="table">
      <thead>
        <tr class="has-background-light">
          <th v-for="(thead, index) in theadData" :key="index">{{ thead }}</th>
        </tr>
      </thead>
      <tbody>
        <slot name="tbodyContent" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'commom-table-simpletable-component',
  props: {
    theadData: {
      type: Array,
      default: () => [],
    },
    customStyle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  min-width: 100%;
}
</style>
