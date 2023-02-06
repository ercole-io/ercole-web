<template>
  <div class="columns">
    <div
      v-for="(col, i) in pageCols"
      :key="i"
      class="column"
      :class="`is-${col.colsize}`"
    >
      <slot :name="col.slotName" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'commom-baselayoutcolumns-component',
  props: {
    pageCols: {
      type: Array,
      default: () => [
        { colsize: '3', slotName: 'col1' },
        { colsize: '9', slotName: 'col2' },
      ],
    },
  },
}
</script>

<style lang="scss" scoped></style>
