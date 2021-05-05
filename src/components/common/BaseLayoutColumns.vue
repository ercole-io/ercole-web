<template>
  <div class="columns">
    <div
      v-for="(col, i) in pageCols"
      :key="i"
      class="column"
      :class="`is-${col.size}`"
    >
      <slot :name="col.name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageCols: {
      type: Array,
      default: () => [
        { size: '3', name: 'col1' },
        { size: '9', name: 'col2' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
