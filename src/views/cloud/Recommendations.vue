<template>
  <ToggleColumns
    getPage="recommendations"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="left"
    />
    <RecommendationsFilters v-if="!loadingTableStatus" slot="left" />

    <RecommendationsList slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RecommendationsList from '@/components/cloud/recommendations/RecommendationsList.vue'
import RecommendationsFilters from '@/components/cloud/recommendations/RecommendationsFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    ToggleColumns,
    RecommendationsList,
    RecommendationsFilters,
    GhostLoading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getRecommendationsData()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getRecommendationsData']),
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
