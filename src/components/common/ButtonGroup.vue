<template>
  <div>
    <span class="is-size-7 has-text-weight-medium mr-2" v-if="groupTitle">
      {{ groupTitle }}
    </span>
    <p class="is-flex is-align-items-center is-justify-content-flex-start mb-2">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: ['groupTitle']
}
</script>

<style lang="scss" scoped></style>
