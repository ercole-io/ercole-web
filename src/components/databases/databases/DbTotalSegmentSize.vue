<template>
  <BoxContent
    :title="$t('views.databases.totalSegment')"
    border
    :mbottom="false"
  >
    <CardStats
      :cardStatValue="databases.stats['total-segments-size'] | prettyBytes"
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
    ...mapState(['databases'])
  }
}
</script>

<style lang="scss" scoped></style>
