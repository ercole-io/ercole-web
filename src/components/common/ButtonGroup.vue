<template>
  <div
    class="is-flex is-align-items-center mb-5"
    :class="hAlign ? hAlign : 'is-justify-content-center'"
  >
    <span class="is-size-7 has-text-weight-medium mr-2" v-if="groupTitle">
      {{ groupTitle }}
    </span>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['groupTitle', 'hAlign']
}
</script>

<style lang="scss" scoped></style>
