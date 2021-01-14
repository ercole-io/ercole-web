<template>
  <div class="table-container">
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
  props: {
    theadData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped></style>
