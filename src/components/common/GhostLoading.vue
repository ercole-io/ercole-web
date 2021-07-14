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
  props: {
    setElement: {
      type: String,
      default: 'div'
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    isCircle: {
      type: Boolean,
      default: false
    },
    setWidth: {
      type: [String, Number]
    },
    setHeight: {
      type: [String, Number]
    },
    setSize: {
      type: String,
      default: 'is-small'
    }
  }
}
</script>

<style lang="scss" scoped></style>
