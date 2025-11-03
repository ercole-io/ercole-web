<template>
  <b-field
    :label="label"
    :label-position="labelPosition"
    custom-class="is-small"
  >
    <slot />
  </b-field>
</template>

<script>
export default {
  name: 'commom-form-field-component',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: 'inside',
    },
  },
}
</script>

<style lang="scss" scoped></style>
