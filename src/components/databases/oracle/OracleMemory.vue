<template>
  <BoxContent :title="$t('views.databases.memory')" border :mbottom="false">
    <GhostLoading :isLoading="loadingTableStatus" setWidth="118" setHeight="48">
      <CardStats
        :cardStatTitle="$t('views.databases.totalMemory')"
        :cardStatValue="totalMemory | prettyBytes(1, true)"
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
  name: 'databases-oracle-memory-component',
  components: {
    BoxContent,
    CardStats,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
    ...mapState(['oracle']),
    totalMemory() {
      return this.oracle.statistics['total-memory-size']
    },
  },
}
</script>

<style lang="scss" scoped></style>
