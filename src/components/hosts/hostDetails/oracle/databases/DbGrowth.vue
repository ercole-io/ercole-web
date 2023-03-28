<template>
  <b-tab-item label="DB Growth">
    <DbGrowth :data="growth" />
  </b-tab-item>
</template>

<script>
import DbGrowth from '@/components/common/DbGrowth.vue'

export default {
  name: 'hosts-details-oracle-databases-growth-component',
  props: {
    growth: {
      type: Array,
      default: null,
    },
  },
  components: {
    DbGrowth,
  },
}
</script>

<style lang="scss" scoped></style>
