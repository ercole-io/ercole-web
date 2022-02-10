<template>
  <ToggleColumns
    getPage="ercoleRecommendations"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <ErcoleRecommendationsFilters slot="left" />
    <ErcoleRecommendationsList slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import ErcoleRecommendationsFilters from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsFilters.vue'
import ErcoleRecommendationsList from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsList.vue'

export default {
  components: {
    ToggleColumns,
    ErcoleRecommendationsFilters,
    ErcoleRecommendationsList,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getRrcoleRecommendations().then(() => {
      this.isMounted = true
    })

    // await this.getLoadBalancersData().then(() => {
    //   this.getInstancesIdleData().then(() => {
    //     this.getBlockStorageData().then(() => {
    //       this.isMounted = true
    //     })
    //   })
    // })
  },
  methods: {
    ...mapActions([
      'getRrcoleRecommendations',
      // 'getLoadBalancersData',
      // 'getInstancesIdleData',
      // 'getBlockStorageData',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
