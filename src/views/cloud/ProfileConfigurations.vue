<template>
  <ToggleColumns
    getPage="profileConfig"
    :leftButton="$t('common.forms.advancedFilters')"
    rightButton="Add Profile"
    v-if="isMounted"
  >
    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="left"
    />
    <ProfileConfigFilters v-if="!loadingTableStatus" slot="left" />

    <ProfileConfigList slot="center" />

    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="right"
    />
    <ProfileConfigForm v-if="!loadingTableStatus" slot="right" />
  </ToggleColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import ProfileConfigList from '@/components/cloud/profileConfig/ProfileList.vue'
import ProfileConfigForm from '@/components/cloud/profileConfig/ProfileForm.vue'
import ProfileConfigFilters from '@/components/cloud/profileConfig/ProfileFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    ToggleColumns,
    ProfileConfigList,
    ProfileConfigForm,
    ProfileConfigFilters,
    GhostLoading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getProfiles()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getProfiles']),
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
