<template>
  <BoxContent :title="$t('views.databases.memory')" border :mbottom="false">
    <CardStats
      :cardStatTitle="$t('views.databases.totalMemory')"
      :cardStatValue="totalMemory | prettyBytes"
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
    totalMemory() {
      return this.oracle.statistics['total-memory-size']
    }
  }
}
</script>

<style lang="scss" scoped></style>
