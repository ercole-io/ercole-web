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
  >
    {{ $t(`common.collumns.${data.sort}`) }}
  </v-th>
</template>

<script>
export default {
  props: ['data', 'hideVirtual', 'hideCPU', 'hideAgent']
}
</script>

<style lang="scss" scoped></style>
