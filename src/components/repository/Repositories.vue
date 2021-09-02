<template>
  <ToggleColumns
    getPage="repository"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <RepoFilters slot="left" />
    <RepoTable slot="center" />
  </ToggleColumns>
</template>

<script>
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RepoTable from '@/components/repository/RepoTable.vue'
import RepoFilters from '@/components/repository/RepoFilters.vue'

export default {
  components: {
    ToggleColumns,
    RepoTable,
    RepoFilters
  }
}
</script>

<style lang="scss" scoped></style>
