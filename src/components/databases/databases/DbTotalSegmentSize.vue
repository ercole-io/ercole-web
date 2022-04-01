<template>
  <BoxContent
    :title="$t('views.databases.totalSegment')"
    border
    :mbottom="false"
  >
    <GhostLoading :isLoading="loadingTableStatus" setHeight="30">
      <CardStats
        :cardStatValue="
          databases.stats['total-segments-size'] | prettyBytes(1, true)
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
