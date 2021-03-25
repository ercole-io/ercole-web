<template>
  <BoxContent title="CPU" border :mbottom="false">
    <CardStats
      cardStatTitle="Total Thread Used"
      :cardStatValue="getOracleTotalCpu"
    />
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import CardStats from '@/components/common/CardStats.vue'

export default {
  components: {
    BoxContent,
    CardStats
  },
  computed: {
    ...mapGetters(['getOracleTotalCpu'])
  }
}
</script>

<style lang="scss" scoped></style>
