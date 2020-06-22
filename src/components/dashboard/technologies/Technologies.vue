<template>
  <BoxContent :title="$t('dashboard.pageTitle.technologies')" border>
    <Technologie :technologies="technologies" />
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import Technologie from '@/components/dashboard/technologies/Technologie.vue'

export default {
  components: {
    BoxContent,
    Technologie
  },
  props: {
    technologies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
