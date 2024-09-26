<template>
  <ToggleColumns
    getPage="allRecommendations"
    :leftButton="$t('common.forms.advancedFilters')"
    :rightButton="$t('common.general.sideInfo')"
    v-if="isMounted"
  >
    <template slot="left">
      <AllRecommendationsFilters>
        <Loading :isLoading="loadingTableStatus" />
      </AllRecommendationsFilters>
    </template>

    <template slot="center">
      <AllRecommendationsList />
    </template>

    <template slot="right">
      <AllRecommendationsCharts />
    </template>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import AllRecommendationsFilters from '@/components/cloud/allRecommendations/Filters.vue'
import AllRecommendationsList from '@/components/cloud/allRecommendations/TableList.vue'
import AllRecommendationsCharts from '@/components/cloud/allRecommendations/Charts.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  name: 'all-recommendations-page',
  components: {
    ToggleColumns,
    Loading,
    AllRecommendationsFilters,
    AllRecommendationsList,
    AllRecommendationsCharts,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getCloudAllRecommendations().then(() => {
      bus.$emit('data', this.returnCloudAllRecommendations)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getCloudAllRecommendations']),
  },
  computed: {
    ...mapGetters(['returnCloudAllRecommendations', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
