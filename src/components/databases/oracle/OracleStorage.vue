<template>
  <BoxContent title="Storage" border :mbottom="false">
    <div class="is-flex is-justify-content-space-around">
      <CardStats
        cardStatTitle="Total Segment Size"
        :cardStatValue="totalSegmentSize | prettyBytes"
      />

      <CardStats
        cardStatTitle="Total Datafile Size"
        :cardStatValue="totalDatafileSize | prettyBytes"
      />
    </div>
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
    totalSegmentSize() {
      return this.oracle.statistics['total-segments-size']
    },
    totalDatafileSize() {
      return this.oracle.statistics['total-datafile-size']
    }
  }
}
</script>

<style lang="scss" scoped></style>
