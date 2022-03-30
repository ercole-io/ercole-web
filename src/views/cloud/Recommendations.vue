<template>
  <ToggleColumns
    getPage="recommendations"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <RecommendationsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </RecommendationsFilters>

    <RecommendationsList slot="center" />
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RecommendationsList from '@/components/cloud/recommendations/RecommendationsList.vue'
import RecommendationsFilters from '@/components/cloud/recommendations/RecommendationsFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    RecommendationsList,
    RecommendationsFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getRecommendationsData().then(() => {
      bus.$emit('data', this.getRecommendations)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getRecommendationsData']),
  },
  computed: {
    ...mapGetters(['getRecommendations', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
