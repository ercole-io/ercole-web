<template>
  <p class="is-size-7 has-text-centered" style="margin-bottom: 0">
    <span class="is-size-7 has-text-weight-light" v-if="cardStatTitle">
      {{ cardStatTitle }}
      <br />
    </span>
    <span class="is-size-5 has-text-weight-medium">
      {{ cardStatValue }}
    </span>
  </p>
</template>

<script>
export default {
  name: 'commom-cardstats-component',
  props: {
    cardStatTitle: {
      type: String,
      required: false,
    },
    cardStatValue: {
      type: [String, Number],
      default: '0',
    },
  },
}
</script>

<style lang="scss" scoped></style>
