<template>
  <BoxContent title="Memory" border :mbottom="false">
    <CardStats
      cardStatTitle="Total Memory Size"
      :cardStatValue="oracle.totalMemory"
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
    ...mapState(['oracle'])
  }
}
</script>

<style lang="scss" scoped></style>
