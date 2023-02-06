<template>
  <b-select v-model="selectVal" :size="size" :placeholder="optionMsg" expanded>
    <template v-if="hasReset">
      <option :value="null" v-if="selectVal">Reset</option>
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
  name: 'commom-form-select-component',
  props: {
    value: {},
    options: {
      type: Array,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    fixedOptions: {
      type: Boolean,
      default: false,
    },
    hasReset: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'is-small',
    },
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    optionMsg() {
      return this.placeholder
        ? this.placeholder
        : this.$i18n.t('common.forms.option')
    },
  },
}
</script>

<style lang="scss" scoped></style>
