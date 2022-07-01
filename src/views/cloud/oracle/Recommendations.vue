<template>
  <ToggleColumns
    getPage="recommendationsOracle"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <ErcoleRecommendationsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </ErcoleRecommendationsFilters>

    <ErcoleRecommendationsList slot="center" />
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import ErcoleRecommendationsFilters from '@/components/cloud/oracle/recommendations/RecommendationsFilters.vue'
import ErcoleRecommendationsList from '@/components/cloud/oracle/recommendations/RecommendationsList.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    ErcoleRecommendationsFilters,
    ErcoleRecommendationsList,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getErcoleRecommendations().then(() => {
      bus.$emit('data', this.returnErcoleRecommendations)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getErcoleRecommendations']),
  },
  computed: {
    ...mapGetters(['returnErcoleRecommendations', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
