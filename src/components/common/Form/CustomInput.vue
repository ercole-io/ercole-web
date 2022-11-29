<template>
  <b-input
    v-model="inputVal"
    size="is-small"
    :type="inputType"
    icon-right="close-circle"
    icon-right-clickable
    @icon-right-click="clearField"
    v-mask="inputMask"
  />
</template>

<script>
export default {
  props: {
    value: {},
    inputType: {
      type: String,
      default: 'text',
    },
    inputMask: {
      type: String,
      default: '',
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
