<template>
  <BoxContent :title="$t('views.dashboard.technologies')" border>
    <Technologie />
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import Technologie from '@/components/dashboard/technologies/Technologie.vue'

export default {
  components: {
    BoxContent,
    Technologie
  },
  async beforeMount() {
    await this.getTechnologiesData().then(() => {
      bus.$emit('loadTechComplete')
    })
  },
  methods: {
    ...mapActions(['getTechnologiesData'])
  }
}
</script>

<style lang="scss" scoped></style>
