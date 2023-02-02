<template>
  <ToggleColumns
    :getPage="returnPagename"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <template slot="left">
      <OracleFilters v-if="returnCloudTechnology === 'Oracle'">
        <Loading :isLoading="loadingTableStatus" />
      </OracleFilters>

      <AwsFilters v-if="returnCloudTechnology === 'Aws'">
        <Loading :isLoading="loadingTableStatus" />
      </AwsFilters>
    </template>

    <template slot="center">
      <OracleTableList v-if="returnCloudTechnology === 'Oracle'" />
      <AwsTableList v-if="returnCloudTechnology === 'Aws'" />
    </template>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import Loading from '@/components/common/Loading.vue'

import OracleFilters from '@/components/cloud/oracle/recommendations/Filters.vue'
import OracleTableList from '@/components/cloud/oracle/recommendations/TableList.vue'

import AwsFilters from '@/components/cloud/aws/recommendations/Filters.vue'
import AwsTableList from '@/components/cloud/aws/recommendations/TableList.vue'

export default {
  name: 'recommendations-page',
  components: {
    ToggleColumns,
    OracleFilters,
    OracleTableList,
    AwsFilters,
    AwsTableList,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    if (this.$route.name === 'oracle-recommendations') {
      this.SET_CLOUD_TECHNOLOGY('Oracle')
    } else if (this.$route.name === 'aws-recommendations') {
      this.SET_CLOUD_TECHNOLOGY('Aws')
    }

    await this.getCloudRecommendations().then(() => {
      bus.$emit('data', this.returnCloudRecommendations)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getCloudRecommendations']),
    ...mapMutations(['SET_CLOUD_TECHNOLOGY']),
  },
  computed: {
    ...mapGetters([
      'returnCloudTechnology',
      'returnCloudRecommendations',
      'loadingTableStatus',
    ]),
    returnPagename() {
      return `recommendations${this.returnCloudTechnology}`
    },
  },
}
</script>

<style lang="scss" scoped></style>
