<template>
  <BoxContent
    :title="$t('views.dashboard.technologies')"
    border
    hasShadow
    :mbottom="false"
    data-cy="technologies"
  >
    <Technologie />
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import Technologie from '@/components/dashboard/technologies/Technologie.vue'

export default {
  name: 'daschboard-technologies-technologies-component',
  components: {
    BoxContent,
    Technologie,
  },
}
</script>

<style lang="scss" scoped></style>
