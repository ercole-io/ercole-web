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

      <AzureProfileConfigFilters v-if="returnCloudTechnology === 'Azure'">
        <Loading :isLoading="loadingTableStatus" />
      </AzureProfileConfigFilters>

      <GoogleProfileConfigFilters v-if="returnCloudTechnology === 'Google'">
        <Loading :isLoading="loadingTableStatus" />
      </GoogleProfileConfigFilters>
    </template>

    <template slot="center">
      <OracleProfileConfigList v-if="returnCloudTechnology === 'Oracle'" />
      <AwsProfileConfigList v-if="returnCloudTechnology === 'Aws'" />
      <AzureProfileConfigList v-if="returnCloudTechnology === 'Azure'" />
      <GoogleProfileConfigList v-if="returnCloudTechnology === 'Google'" />
    </template>

    <template slot="right">
      <OracleProfileConfigForm v-if="returnCloudTechnology === 'Oracle'">
        <Loading :isLoading="loadingTableStatus" />
      </OracleProfileConfigForm>

      <AwsProfileConfigForm v-if="returnCloudTechnology === 'Aws'">
        <Loading :isLoading="loadingTableStatus" />
      </AwsProfileConfigForm>

      <AzureProfileConfigForm v-if="returnCloudTechnology === 'Azure'">
        <Loading :isLoading="loadingTableStatus" />
      </AzureProfileConfigForm>

      <GoogleProfileConfigForm v-if="returnCloudTechnology === 'Google'">
        <Loading :isLoading="loadingTableStatus" />
      </GoogleProfileConfigForm>
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

import AzureProfileConfigList from '@/components/cloud/azure/profileConfig/ProfileList.vue'
import AzureProfileConfigForm from '@/components/cloud/azure/profileConfig/ProfileForm.vue'
import AzureProfileConfigFilters from '@/components/cloud/azure/profileConfig/ProfileFilters.vue'

import GoogleProfileConfigList from '@/components/cloud/google/profileConfig/ProfileList.vue'
import GoogleProfileConfigForm from '@/components/cloud/google/profileConfig/ProfileForm.vue'
import GoogleProfileConfigFilters from '@/components/cloud/google/profileConfig/ProfileFilters.vue'

export default {
  name: 'cloud-profile-page',
  components: {
    ToggleColumns,
    Loading,
    OracleProfileConfigList,
    OracleProfileConfigForm,
    OracleProfileConfigFilters,
    AwsProfileConfigList,
    AwsProfileConfigForm,
    AwsProfileConfigFilters,
    AzureProfileConfigList,
    AzureProfileConfigForm,
    AzureProfileConfigFilters,
    GoogleProfileConfigList,
    GoogleProfileConfigForm,
    GoogleProfileConfigFilters,
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
    } else if (this.$route.name === 'azure-profile-configurations') {
      this.SET_CLOUD_TECHNOLOGY('Azure')
    } else if (this.$route.name === 'google-profile-configurations') {
      this.SET_CLOUD_TECHNOLOGY('Google')
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
