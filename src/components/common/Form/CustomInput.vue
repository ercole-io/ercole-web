<template>
  <b-input
    v-model="inputVal"
    size="is-small"
    :type="inputType"
    icon-right="close-circle"
    icon-right-clickable
    @icon-right-click="clearField"
    :disabled="customInputDisable"
  />
</template>

<script>
export default {
  name: 'commom-form-input-component',
  props: {
    value: {},
    inputType: {
      type: String,
      default: 'text',
    },
    customInputDisable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clearField() {
      this.inputVal = null
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        let setVal = val
        if (this.inputType === 'number') {
          setVal = Number(val)
        }
        this.$emit('input', setVal)
      },
    },
  },
}
</script>

<style lang="scss"></style>
