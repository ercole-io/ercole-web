<template>
  <ToggleColumns
    getPage="loadBalancers"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <LoadBalancersFilters slot="left" />
    <LoadBalancersList slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import LoadBalancersFilters from '@/components/cloud/loadBalancers/LoadBalancersFilters.vue'
import LoadBalancersList from '@/components/cloud/loadBalancers/LoadBalancersList.vue'

export default {
  components: {
    ToggleColumns,
    LoadBalancersFilters,
    LoadBalancersList,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getLoadBalancersData().then(() => {
      this.getInstancesIdleData().then(() => {
        this.getBlockStorageData().then(() => {
          this.isMounted = true
        })
      })
    })
  },
  methods: {
    ...mapActions([
      'getLoadBalancersData',
      'getInstancesIdleData',
      'getBlockStorageData',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
