<template>
  <ToggleColumns
    getPage="repository"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
  >
    <div slot="left">filters</div>
    <RepoTable slot="center" />
  </ToggleColumns>
</template>

<script>
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import RepoTable from '@/components/repository/RepoTable.vue'

export default {
  components: {
    ToggleColumns,
    RepoTable
  }
}
</script>

<style lang="scss" scoped></style>
