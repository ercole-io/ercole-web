<template>
  <div class="is-flex" :class="customClass">
    <b-radio
      v-for="(opt, i) in setOptions"
      :key="i"
      size="is-small"
      v-model="radioVal"
      :native-value="opt.val"
      :class="customRadioClass"
      :disabled="customRadioDisable"
    >
      {{ opt.text }}
    </b-radio>
  </div>
</template>

<script>
export default {
  name: 'commom-form-radio-component',
  props: {
    value: {},
    options: {
      type: Array,
      default: () => [],
    },
    customClass: {
      type: String,
      default: 'is-justify-content-space-around',
    },
    customRadioClass: {
      type: String,
      default: '',
    },
    customRadioDisable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    radioVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    setOptions() {
      return this.options.length > 0 ? this.options : this.defaultOptions
    },
    defaultOptions() {
      return [
        {
          text: this.$i18n.t('common.forms.yes'),
          val: 'true',
        },
        {
          text: this.$i18n.t('common.forms.no'),
          val: 'false',
        },
        {
          text: this.$i18n.t('common.forms.all'),
          val: '',
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped></style>
