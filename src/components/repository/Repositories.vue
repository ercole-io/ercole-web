<template>
  <ToggleColumns
    getPage="repository"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <RepoFilters slot="left">
      <Loading :isLoading="loadingTableStatus" />
    </RepoFilters>

    <RepoTable slot="center" />
  </ToggleColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RepoTable from '@/components/repository/RepoTable.vue'
import RepoFilters from '@/components/repository/RepoFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    RepoTable,
    RepoFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
