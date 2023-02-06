<template>
  <div>
    <p class="is-flex is-align-items-center is-justify-content-flex-start mb-2">
      <span class="is-size-7 has-text-weight-medium mr-2" v-if="groupTitle">
        {{ groupTitle }}
      </span>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'commom-buttongroup-component',
  props: ['groupTitle'],
}
</script>

<style lang="scss" scoped></style>
