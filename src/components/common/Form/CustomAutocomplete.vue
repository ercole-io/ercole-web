<template>
  <b-autocomplete
    v-model="inputVal"
    size="is-small"
    type="number"
    clearable
    :data="filterResult"
    @typing="filterMethod($event)"
  />
</template>

<script>
export default {
  props: {
    value: {},
    filterResult: {
      type: Array,
      required: true
    },
    filterMethod: {
      type: Function,
      required: true
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
