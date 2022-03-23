<template>
  <ToggleColumns
    getPage="repository"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <GhostLoading
      v-if="loadingTableStatus"
      :isLoading="loadingTableStatus"
      setHeight="640"
      slot="left"
    />
    <RepoFilters v-if="!loadingTableStatus" slot="left" />

    <RepoTable slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RepoTable from '@/components/repository/RepoTable.vue'
import RepoFilters from '@/components/repository/RepoFilters.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  components: {
    ToggleColumns,
    RepoTable,
    RepoFilters,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
