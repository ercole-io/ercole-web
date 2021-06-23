<template>
  <BoxContent :title="$t('views.dashboard.technologies')" border>
    <Technologie :technologies="getTechnologies" />
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import Technologie from '@/components/dashboard/technologies/Technologie.vue'

export default {
  components: {
    BoxContent,
    Technologie
  },
  async beforeMount() {
    await this.$store.dispatch('getTechnologiesData')
  },
  computed: {
    ...mapGetters(['getTechnologies'])
  }
}
</script>

<style lang="scss" scoped></style>
