<template>
  <BoxContent
    :title="$t('views.databases.totalMemory')"
    border
    :mbottom="false"
  >
    <GhostLoading :isLoading="loadingTableStatus" setHeight="30">
      <CardStats
        :cardStatValue="
          databases.stats['total-memory-size'] | prettyBytes(1, true)
        "
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
  name: 'databases-databases-memorysize-component',
  components: {
    BoxContent,
    CardStats,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
    ...mapState(['databases']),
  },
}
</script>

<style lang="scss" scoped></style>
