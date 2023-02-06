<template>
  <td class="is-size-5 has-text-centered">
    <span
      class="icon is-size-4"
      :class="{
        gold: position === 0,
        silver: position === 1,
        bronze: position === 2,
      }"
      style="position: relative"
    >
      <i class="fas fa-star" />
      <span
        class="is-size-7 has-text-grey-darker"
        style="position: absolute; top: 5px"
      >
        {{ position + 1 }}
      </span>
    </span>
  </td>
</template>

<script>
export default {
  name: 'commom-table-staricon-component',
  props: {
    position: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.gold {
  color: #c9b037;
}
.silver {
  color: #b4b4b4;
}
.bronze {
  color: #ad8a56;
}
</style>
