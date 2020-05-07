<template>
  <BoxContent :title="$t('dashboard.pageTitle.totalTargets')">
    total targets
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  data() {
    return {
      data: [
        { name: 'Agents Discovered', value: '100/150' },
        { name: 'Percentage of Compliance', value: '80%' },
        { name: 'Money Missing', value: '-87.000 $' }
      ],
      columns: [{ field: 'name' }, { field: 'value' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: none;
}
.row {
  border: none;
}
</style>
