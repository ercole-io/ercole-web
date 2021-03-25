<template>
  <BoxContent title="Storage" border :mbottom="false">
    <div class="is-flex is-justify-content-space-around">
      <CardStats
        cardStatTitle="Total Segment Size"
        :cardStatValue="oracle.totalSegment | prettyBytes"
      />

      <CardStats
        cardStatTitle="Total Datafile Size"
        :cardStatValue="oracle.totalDatafile | prettyBytes"
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
    ...mapState(['oracle'])
  }
}
</script>

<style lang="scss" scoped></style>
