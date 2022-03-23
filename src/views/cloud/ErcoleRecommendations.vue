<template>
  <ToggleColumns
    getPage="ercoleRecommendations"
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
    <ErcoleRecommendationsFilters v-if="!loadingTableStatus" slot="left" />

    <ErcoleRecommendationsList slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import ErcoleRecommendationsFilters from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsFilters.vue'
import ErcoleRecommendationsList from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsList.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    ToggleColumns,
    ErcoleRecommendationsFilters,
    ErcoleRecommendationsList,
    GhostLoading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getRrcoleRecommendations()

    // await this.getLoadBalancersData().then(() => {
    //   this.getInstancesIdleData().then(() => {
    //     this.getBlockStorageData().then(() => {
    //       this.isMounted = true
    //     })
    //   })
    // })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions([
      'getRrcoleRecommendations',
      // 'getLoadBalancersData',
      // 'getInstancesIdleData',
      // 'getBlockStorageData',
    ]),
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
