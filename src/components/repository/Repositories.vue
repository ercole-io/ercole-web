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

    <div class="is-relative" slot="center">
      <b-button
        class="bt-switchView"
        type="is-dark"
        size="is-small"
        @click="switchView = !switchView"
      >
        {{ switchViewText }}
      </b-button>

      <RepoTable class="animate__animated animate__fadeIn" v-if="switchView" />
      <RepoList class="animate__animated animate__fadeIn" v-else />
    </div>
  </ToggleColumns>
</template>

<script>
import { mapGetters } from 'vuex'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RepoTable from '@/components/repository/RepoTable.vue'
import RepoList from '@/components/repository/RepoList.vue'
import RepoFilters from '@/components/repository/RepoFilters.vue'
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    ToggleColumns,
    RepoTable,
    RepoList,
    RepoFilters,
    Loading,
  },
  data() {
    return {
      isMounted: false,
      switchView: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
    switchViewText() {
      return this.switchView ? 'List Mode' : 'Table Mode'
    },
  },
}
</script>

<style lang="scss" scoped>
.bt-switchView {
  position: absolute;
  right: 0px;
  top: -42px;
}
</style>
