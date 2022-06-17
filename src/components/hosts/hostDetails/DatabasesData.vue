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

    <AdvancedFiltersButton slot="customTitle" />

    <HbuttonScroll height="30" elemScroll="tabs" />

    <div v-if="showDatabases">
      <Oracle v-if="isOracle" />
      <Mirosoft v-if="isMicrosoft" />
      <Mysql v-if="isMysql" />
      <Postgre v-if="isPostgresql" />
    </div>

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
import AdvancedFiltersButton from '@/components/hosts/hostDetails/DatabasesFiltersButton.vue'

import Oracle from '@/components/hosts/hostDetails/oracle/databases/Databases.vue'
import Mirosoft from '@/components/hosts/hostDetails/microsoft/databases/Databases.vue'
import Mysql from '@/components/hosts/hostDetails/mysql/databases/Databases.vue'
import Postgre from '@/components/hosts/hostDetails/postgresql/databases/Databases.vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [hostDatabasesFilters, hostDetailsDatabasesMixins],
  components: {
    BoxContent,
    SearchInput,
    HbuttonScroll,
    NoContent,
    AdvancedFiltersButton,
    Oracle,
    Mirosoft,
    Mysql,
    Postgre,
  },
  computed: {
    ...mapGetters(['currentHostType']),
    isOracle() {
      return this.currentHostType === 'oracle'
    },
    isMysql() {
      return this.currentHostType === 'mysql'
    },
    isMicrosoft() {
      return this.currentHostType === 'microsoft'
    },
    isPostgresql() {
      return this.currentHostType === 'postgresql'
    },
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
