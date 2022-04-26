<template>
  <BoxContent :title="$t('views.databases.storage')" border :mbottom="false">
    <div class="is-flex is-justify-content-space-around">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setWidth="118"
        setHeight="48"
      >
        <CardStats
          :cardStatTitle="$t('views.databases.totalSegment')"
          :cardStatValue="totalSegmentSize | prettyBytes(1, true)"
        />
      </GhostLoading>

      <GhostLoading
        :isLoading="loadingTableStatus"
        setWidth="118"
        setHeight="48"
      >
        <CardStats
          :cardStatTitle="$t('views.databases.totalDatafile')"
          :cardStatValue="totalDatafileSize | prettyBytes(1, true)"
        />
      </GhostLoading>
    </div>
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
    totalSegmentSize() {
      return this.oracle.statistics['total-segments-size']
    },
    totalDatafileSize() {
      return this.oracle.statistics['total-datafile-size']
    },
  },
}
</script>

<style lang="scss" scoped></style>
