<template>
  <ToggleColumns
    getPage="recommendations"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <RecommendationsFilters slot="left" />
    <RecommendationsList slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RecommendationsList from '@/components/cloud/recommendations/RecommendationsList.vue'
import RecommendationsFilters from '@/components/cloud/recommendations/RecommendationsFilters.vue'

export default {
  components: {
    ToggleColumns,
    RecommendationsList,
    RecommendationsFilters
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getRecommendationsData().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['getRecommendationsData'])
  }
}
</script>

<style lang="scss" scoped></style>
