<template>
  <BoxContent title="CPU" border :mbottom="false">
    <CardStats
      :cardStatTitle="$t('views.databases.totalThread')"
      :cardStatValue="totalCpu"
    />
  </BoxContent>
</template>

<script>
import { mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import CardStats from '@/components/common/CardStats.vue'

export default {
  components: {
    BoxContent,
    CardStats
  },
  computed: {
    ...mapState(['oracle']),
    totalCpu() {
      return this.oracle.statistics['total-work']
    }
  }
}
</script>

<style lang="scss" scoped></style>
