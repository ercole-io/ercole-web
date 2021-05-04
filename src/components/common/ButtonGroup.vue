<template>
  <div>
    <span class="is-size-7 has-text-weight-medium mr-2" v-if="groupTitle">
      {{ groupTitle }}
    </span>
    <p
      class="is-flex is-align-items-center mb-2"
      :class="hAlign ? hAlign : 'is-justify-content-center'"
    >
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: ['groupTitle', 'hAlign']
}
</script>

<style lang="scss" scoped></style>
