<template>
  <v-th
    :sortKey="data.sort"
    :class="
      (data.type === 'virtual' && hideVirtual) ||
      (data.type === 'cpu' && hideCPU) ||
      (data.type === 'agent' && hideAgent)
        ? 'hide'
        : data.class
    "
    >{{ data.name }}</v-th
  >
</template>

<script>
export default {
  props: ['data', 'hideVirtual', 'hideCPU', 'hideAgent']
}
</script>

<style lang="scss" scoped></style>
