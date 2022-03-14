<template>
  <div>
    <BoxContent
      :title="`${$t('views.hostDetails.databases')} (${countDatabases})`"
      border
      hasShadow
      mbottom="false"
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

      <AdvancedFiltersButton slot="customTitle" v-if="isOracle" />

      <HbuttonScroll height="30" elemScroll="tabs" />

      <OracleDatabases
        :currentDBs="currentHostFiltered(searchDb)"
        v-if="showDatabases && isOracle"
      />

      <MysqlDatabases
        :currentDBs="currentHostFiltered(searchDb)"
        v-else-if="showDatabases && isMysql"
      />

      <NoContent
        v-else
        :noContentText="$t('views.hostDetails.noDatabaseHost')"
        style="min-height: 200px"
      />
    </BoxContent>
  </div>
</template>

<script>
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import OracleDatabases from '@/components/hosts/hostDetails/databases/oracle/OracleDatabases.vue'
import MysqlDatabases from '@/components/hosts/hostDetails/databases/mysql/MysqlDatabases.vue'
import NoContent from '@/components/common/NoContent.vue'
import AdvancedFiltersButton from '@/components/hosts/hostDetails/databases/DatabasesFiltersButton.vue'

export default {
  mixins: [hostDatabasesFilters],
  components: {
    BoxContent,
    OracleDatabases,
    SearchInput,
    HbuttonScroll,
    MysqlDatabases,
    NoContent,
    AdvancedFiltersButton,
  },
}
</script>

<style lang="scss">
.tabs {
  &::-webkit-scrollbar {
    background: transparent;
  }
}
</style>
