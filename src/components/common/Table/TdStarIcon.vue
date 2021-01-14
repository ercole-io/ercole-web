<template>
  <td class="is-size-5 has-text-centered">
    <span
      class="icon is-size-3"
      :class="{
        gold: position === 0,
        silver: position === 1,
        bronze: position === 2
      }"
      style="position:relative"
    >
      <i class="fas fa-star" />
      <span
        class="is-size-6 has-text-grey-darker"
        style="position: absolute; top: 2px;"
      >
        {{ position + 1 }}
      </span>
    </span>
  </td>
</template>

<script>
export default {
  props: {
    position: {
      type: Number,
      default: 0
    }
  }
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
