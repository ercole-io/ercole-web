<template>
  <BoxContent title="CPU" border :mbottom="false">
    <GhostLoading :isLoading="loadingTableStatus" setWidth="118" setHeight="48">
      <CardStats
        :cardStatTitle="$t('views.databases.totalThread')"
        :cardStatValue="totalCpu"
      />
    </GhostLoading>
  </BoxContent>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import CardStats from '@/components/common/CardStats.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    BoxContent,
    CardStats,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
    ...mapState(['oracle']),
    totalCpu() {
      return this.oracle.statistics['total-work']
    },
  },
}
</script>

<style lang="scss" scoped></style>
