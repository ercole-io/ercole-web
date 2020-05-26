<template>
  <BoxContent :title="$t('dashboard.pageTitle.technologies')" border>
    <Technologie :technologies="techData" />
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
  data() {
    return {
      techData: [
        { name: 'Oracle', number: 50, perc: 40, value: '-40k' },
        { name: 'MySQL', number: 20, perc: 60, value: '-5k' },
        { name: 'MongoDB', number: 3, perc: 75, value: '-2k' },
        { name: 'PSQL', number: 10, perc: 80, value: '-3k' },
        { name: 'Oracle', number: 50, perc: 40, value: '-40k' },
        { name: 'MySQL', number: 20, perc: 60, value: '-5k' },
        { name: 'MongoDB', number: 3, perc: 75, value: '-2k' },
        { name: 'PSQL', number: 10, perc: 80, value: '-3k' },
        { name: 'Oracle', number: 50, perc: 40, value: '-40k' },
        { name: 'MySQL', number: 20, perc: 60, value: '-5k' },
        { name: 'MongoDB', number: 3, perc: 75, value: '-2k' },
        { name: 'PSQL', number: 10, perc: 80, value: '-3k' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
