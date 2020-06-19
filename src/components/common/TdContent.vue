<template>
  <td v-tooltip="options">
    <template v-if="!isArray && !hasIcon">{{ value }}</template>
    <template v-if="isArray">
      <span v-for="(val, i) in value" :key="i" v-tooltip="options">
        {{ val }} <br />
      </span>
    </template>
    <template v-if="hasIcon">
      <b-icon
        :pack="value[1]"
        :icon="value[0]"
        size="is-small"
        :type="value[2]"
        style="vertical-align: middle"
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
  data() {
    return {
      options: {
        content: this.value,
        classes: ['info']
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
