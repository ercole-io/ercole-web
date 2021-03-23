<template>
  <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
    <span class="is-size-7 has-text-weight-light" v-if="cardStatTitle">
      {{ cardStatTitle }}
      <br />
    </span>
    <span class="is-size-5 has-text-weight-medium">
      {{ cardStatValue | formatNumber(formatNumber[0], formatNumber[1]) }}
    </span>
  </p>
</template>

<script>
export default {
  props: {
    cardStatTitle: {
      type: String,
      required: false
    },
    cardStatValue: {
      type: [String, Number],
      default: '0'
    },
    formatNumber: {
      type: Array,
      default: () => ['0.00', 'GB']
    }
  }
}
</script>

<style lang="scss" scoped></style>
