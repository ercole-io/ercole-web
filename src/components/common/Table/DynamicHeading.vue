<template>
  <v-th
    :sortKey="data.sort"
    :class="
      data.group && moreInfoToggle['hidden' + data.group]
        ? 'is-hidden'
        : data.class
    "
    :colspan="data.colspan"
  >
    {{ $t(`${data.langKey}`) }}
  </v-th>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['data'],
  computed: {
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss" scoped></style>
