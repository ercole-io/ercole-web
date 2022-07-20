<template>
  <ToggleColumns
    :getPage="returnPagename"
    :leftButton="$t('common.forms.advancedFilters')"
    rightButton="Add Profile"
    v-if="isMounted"
  >
    <template slot="left">
      <OracleProfileConfigFilters v-if="returnCloudTechnology === 'Oracle'">
        <Loading :isLoading="loadingTableStatus" />
      </OracleProfileConfigFilters>

      <AwsProfileConfigFilters v-if="returnCloudTechnology === 'Aws'">
        <Loading :isLoading="loadingTableStatus" />
      </AwsProfileConfigFilters>
    </template>

    <template slot="center">
      <OracleProfileConfigList v-if="returnCloudTechnology === 'Oracle'" />
      <AwsProfileConfigList v-if="returnCloudTechnology === 'Aws'" />
    </template>

    <template slot="right">
      <OracleProfileConfigForm v-if="returnCloudTechnology === 'Oracle'">
        <Loading :isLoading="loadingTableStatus" />
      </OracleProfileConfigForm>

      <AwsProfileConfigForm v-if="returnCloudTechnology === 'Aws'">
        <Loading :isLoading="loadingTableStatus" />
      </AwsProfileConfigForm>
    </template>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import Loading from '@/components/common/Loading.vue'

import OracleProfileConfigList from '@/components/cloud/oracle/profileConfig/ProfileList.vue'
import OracleProfileConfigForm from '@/components/cloud/oracle/profileConfig/ProfileForm.vue'
import OracleProfileConfigFilters from '@/components/cloud/oracle/profileConfig/ProfileFilters.vue'

import AwsProfileConfigList from '@/components/cloud/aws/profileConfig/ProfileList.vue'
import AwsProfileConfigForm from '@/components/cloud/aws/profileConfig/ProfileForm.vue'
import AwsProfileConfigFilters from '@/components/cloud/aws/profileConfig/ProfileFilters.vue'

export default {
  components: {
    ToggleColumns,
    Loading,
    OracleProfileConfigList,
    OracleProfileConfigForm,
    OracleProfileConfigFilters,
    AwsProfileConfigList,
    AwsProfileConfigForm,
    AwsProfileConfigFilters,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    if (this.$route.name === 'oracle-profile-configurations') {
      this.SET_CLOUD_TECHNOLOGY('Oracle')
    } else if (this.$route.name === 'aws-profile-configurations') {
      this.SET_CLOUD_TECHNOLOGY('Aws')
    }

    await this.getCloudProfiles().then(() => {
      bus.$emit('data', this.returnCloudProfiles)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getCloudProfiles']),
    ...mapMutations(['SET_CLOUD_TECHNOLOGY']),
  },
  computed: {
    ...mapGetters([
      'returnCloudTechnology',
      'returnCloudProfiles',
      'loadingTableStatus',
    ]),
    returnPagename() {
      return `profileConfig${this.returnCloudTechnology}`
    },
  },
}
</script>

<style lang="scss" scoped></style>
