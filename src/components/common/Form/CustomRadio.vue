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
  data() {
    return {
      defaultOptions: [
        {
          text: 'Yes',
          val: 'true'
        },
        {
          text: 'No',
          val: 'false'
        },
        {
          text: 'All',
          val: ''
        }
      ]
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
