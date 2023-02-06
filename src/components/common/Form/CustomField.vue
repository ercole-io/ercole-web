<template>
  <b-field :label="label" custom-class="is-small">
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
  },
}
</script>

<style lang="scss" scoped></style>
