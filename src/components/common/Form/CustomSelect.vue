<template>
  <b-select
    v-model="selectVal"
    size="is-small"
    :placeholder="placeholder"
    expanded
  >
    <template v-if="hasReset">
      <option :value="null" v-if="selectVal">
        Reset
      </option>
    </template>

    <template v-if="fixedOptions">
      <slot />
    </template>

    <template v-else>
      <option v-for="(item, index) in options" :key="index">
        {{ item }}
      </option>
    </template>
  </b-select>
</template>

<script>
export default {
  props: {
    value: {},
    options: {
      type: Array,
      required: false
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    fixedOptions: {
      type: Boolean,
      default: false
    },
    hasReset: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    selectVal: {
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
