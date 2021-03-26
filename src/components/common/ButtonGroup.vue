<template>
  <div class="is-flex is-justify-content-center is-align-items-center mb-5">
    <span class="is-size-7 has-text-weight-medium mr-2" v-if="groupTitle">
      {{ groupTitle }}
    </span>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['groupTitle']
}
</script>

<style lang="scss" scoped></style>
