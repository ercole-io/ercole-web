<template>
  <td>
    <template v-if="!isArray && !hasIcon">
      <span v-tooltip="options(value)">{{ value }}</span>
    </template>

    <template v-if="isArray">
      <span v-for="(val, i) in value" :key="i" v-tooltip="options(val)">
        {{ val }} <br />
      </span>
    </template>

    <template v-if="hasIcon">
      <b-icon
        size="is-small"
        :pack="value[1]"
        :icon="value[0]"
        :type="value[2]"
        v-tooltip="options(value[3])"
        style="vertical-align: middle;"
      >
      </b-icon>
    </template>
  </td>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array, Boolean],
      default: null
    },
    isArray: {
      type: Boolean,
      default: false
    },
    hasIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    options(val) {
      return {
        content: val !== '-' ? val : null,
        classes: ['info']
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
