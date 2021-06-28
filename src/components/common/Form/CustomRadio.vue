<template>
  <div class="is-flex is-justify-content-space-around">
    <b-radio
      v-for="(opt, i) in setOptions"
      :key="i"
      size="is-small"
      v-model="radioVal"
      :native-value="opt.val"
    >
      {{ opt.text }}
    </b-radio>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    radioVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    setOptions() {
      return this.options.length > 0 ? this.options : this.defaultOptions
    },
    defaultOptions() {
      return [
        {
          text: this.$i18n.t('common.forms.yes'),
          val: 'true'
        },
        {
          text: this.$i18n.t('common.forms.no'),
          val: 'false'
        },
        {
          text: this.$i18n.t('common.forms.all'),
          val: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
