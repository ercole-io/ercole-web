<template>
  <div>
    <BoxContent
      :title="`${$t('views.hostDetails.databases')} (${countDatabases})`"
    >
      <SearchInput
        :searchPlaceholder="$t('views.hostDetails.searchBy')"
        v-model="searchDb"
        slot="customTitle"
        @input="onSearch($event)"
        :onBlur="onSearchBlur"
        v-if="currentHostDBs.length > 1"
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
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import OracleDatabases from '@/components/hosts/hostDetails/databases/oracle/OracleDatabases.vue'
import MysqlDatabases from '@/components/hosts/hostDetails/databases/mysql/MysqlDatabases.vue'
import NoContent from '@/components/common/NoContent.vue'
import AdvancedFiltersButton from '@/components/hosts/hostDetails/databases/DatabasesFiltersButton.vue'

export default {
  components: {
    BoxContent,
    OracleDatabases,
    SearchInput,
    HbuttonScroll,
    MysqlDatabases,
    NoContent,
    AdvancedFiltersButton
  },
  data() {
    return {
      searchDb: ''
    }
  },
  async beforeMount() {
    await this.getAgreementParts()
  },
  methods: {
    ...mapActions(['getAgreementParts']),
    onSearch(e) {
      if (e !== '' && e.length > 0) {
        bus.$emit('isSearching', true)
        bus.$emit('sendSearchVal', e)
      }
    },
    onSearchBlur() {
      if (this.searchDb.length === 0) {
        bus.$emit('isSearching', false)
        bus.$emit('sendSearchVal', '')
      }
    }
  },
  computed: {
    ...mapGetters(['currentHostType', 'currentHostFiltered', 'currentHostDBs']),
    countDatabases() {
      return this.currentHostFiltered(this.searchDb).length
    },
    showDatabases() {
      return this.currentHostFiltered(this.searchDb).length > 0
    },
    isOracle() {
      return this.currentHostType === 'oracle'
    },
    isMysql() {
      return this.currentHostType === 'mysql'
    }
  }
}
</script>

<style lang="scss">
.tabs {
  &::-webkit-scrollbar {
    background: transparent;
  }
}
</style>
