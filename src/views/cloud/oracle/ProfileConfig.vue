<template>
  <ToggleColumns
    getPage="profileConfigOracle"
    :leftButton="$t('common.forms.advancedFilters')"
    rightButton="Add Profile"
    v-if="isMounted"
  >
    <ProfileConfigFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </ProfileConfigFilters>

    <ProfileConfigList slot="center" />

    <ProfileConfigForm slot="right">
      <Loading :isLoading="loadingTableStatus" />
    </ProfileConfigForm>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import ProfileConfigList from '@/components/cloud/oracle/profileConfig/ProfileList.vue'
import ProfileConfigForm from '@/components/cloud/oracle/profileConfig/ProfileForm.vue'
import ProfileConfigFilters from '@/components/cloud/oracle/profileConfig/ProfileFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    ProfileConfigList,
    ProfileConfigForm,
    ProfileConfigFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getProfiles().then(() => {
      bus.$emit('data', this.getOciProfiles)
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getProfiles']),
  },
  computed: {
    ...mapGetters(['getOciProfiles', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
