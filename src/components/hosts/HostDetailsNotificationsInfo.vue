<template>
  <span class="has-text-weight-medium	is-size-7">
    {{ info.total }} notifications from the last week:
    <span class="has-text-weight-light">Agents:</span> {{ info.agents }}
    <span class="has-text-weight-light"> | Licenses:</span> {{ info.licenses }}
    <span class="has-text-weight-light"> | Systems:</span> {{ info.systems }}
  </span>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
