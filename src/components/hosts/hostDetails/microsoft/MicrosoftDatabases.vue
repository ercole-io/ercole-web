<template>
  <BoxContent
    :title="`${$t('views.hostDetails.databases')} (${countDatabases})`"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding: 0"
  >
    <SearchInput
      :searchPlaceholder="$t('views.hostDetails.searchBy')"
      v-model="searchDb"
      slot="customTitle"
      @input="onSearch($event)"
      :onBlur="onSearchBlur"
      v-show="!hideMainSearch"
    />

    <HbuttonScroll height="30" elemScroll="tabs" />

    <Databases
      :currentDBs="currentHostFiltered(searchDb)"
      v-if="showDatabases"
    />

    <NoContent
      v-else
      :noContentText="$t('views.hostDetails.noDatabaseHost')"
      style="min-height: 200px"
    />
  </BoxContent>
</template>

<script>
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import NoContent from '@/components/common/NoContent.vue'
import Databases from '@/components/hosts/hostDetails/microsoft/databases/Databases.vue'

export default {
  mixins: [hostDatabasesFilters, hostDetailsDatabasesMixins],
  components: {
    BoxContent,
    SearchInput,
    HbuttonScroll,
    NoContent,
    Databases,
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  &::-webkit-scrollbar {
    background: transparent;
  }
}
</style>
