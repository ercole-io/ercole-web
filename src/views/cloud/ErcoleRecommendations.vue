<template>
  <ToggleColumns
    getPage="ercoleRecommendations"
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
import ErcoleRecommendationsFilters from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsFilters.vue'
import ErcoleRecommendationsList from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsList.vue'
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
    await this.getRrcoleRecommendations().then(() => {
      bus.$emit('data', this.getMergedData)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getRrcoleRecommendations']),
  },
  computed: {
    ...mapGetters(['getMergedData', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
