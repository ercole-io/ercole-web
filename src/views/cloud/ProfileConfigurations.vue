<template>
  <ToggleColumns
    getPage="profileConfig"
    :leftButton="$t('common.forms.advancedFilters')"
    rightButton="Add Profile"
    v-if="isMounted"
  >
    <ProfileConfigFilters slot="left" />
    <ProfileConfigList slot="center" />
    <ProfileConfigForm slot="right" />
  </ToggleColumns>
</template>

<script>
import { mapActions } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import ProfileConfigList from '@/components/cloud/profileConfig/ProfileList.vue'
import ProfileConfigForm from '@/components/cloud/profileConfig/ProfileForm.vue'
import ProfileConfigFilters from '@/components/cloud/profileConfig/ProfileFilters.vue'

export default {
  components: {
    ToggleColumns,
    ProfileConfigList,
    ProfileConfigForm,
    ProfileConfigFilters
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getProfiles().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['getProfiles'])
  }
}
</script>

<style lang="scss" scoped></style>
