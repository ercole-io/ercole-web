<template>
  <component :is="setElement">
    <template v-if="!isLoading">
      <slot></slot>
    </template>
    <b-skeleton
      :size="setSize"
      :active="isLoading"
      :width="setWidth"
      :height="setHeight"
      :circle="isCircle"
    />
  </component>
</template>

<script>
export default {
  name: 'commom-ghostloading-component',
  props: {
    setElement: {
      type: String,
      default: 'div',
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    isCircle: {
      type: Boolean,
      default: false,
    },
    setWidth: {
      type: [String, Number],
      default: '100%',
    },
    setHeight: {
      type: [String, Number],
      default: '100%',
    },
    setSize: {
      type: String,
      default: 'is-small',
    },
  },
}
</script>

<style lang="scss" scoped></style>
