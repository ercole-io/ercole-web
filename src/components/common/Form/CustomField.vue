<template>
  <b-field
    :label="label"
    :label-position="labelPosition"
    :type="labelType"
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
      default: '',
    },
    labelType: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
